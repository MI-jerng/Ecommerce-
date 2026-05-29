import { defineStore } from 'pinia'
import { ref } from 'vue'
import { computed } from 'vue'
import { apolloClient } from '@/apollo/client'
import { GET_TODOS, ADD_TODO, TOGGLE_TODO, DELETE_TODO, TODOS_SUB,} from '@/graphql/todos'

type GetTodosResult = {
  todos: Todo[]
}

export type Todo = {
  id: string
  title: string
  is_done: boolean
  created_at: string
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filter = ref<'all' | 'active' | 'done'>('all')

  async function fetchTodos() { // Read Data from hasura
    loading.value = true
    error.value = null

    try {
      const { data } = await apolloClient.query({
        query: GET_TODOS,
        fetchPolicy: 'network-only',
      })

      todos.value = data.todos
    } catch (e: any) {
      error.value = e.message ?? 'Failed to load todos'
    } finally {
      loading.value = false
    }
  }

  async function addTodo(title: string) { // Create Data (Local insert + mutation)
    const clean = title.trim()
    if (!clean) return

    const tempTd = `temp-${Date.now()}`
    const tempTodo: Todo = {
      id: tempTd,
      title: clean,
      is_done: false,
      created_at: new Date().toISOString(),
    }
    todos.value.unshift(tempTodo) // Push locally right away

    try {
        await apolloClient.mutate({
            mutation: ADD_TODO,
            variables: {
            title: clean,
            },

            update(cache, { data }) {
                const newTodo = data?.insert_todos_one
                if (!newTodo) return

                const existing = cache.readQuery<GetTodosResult>({ 
                    query: GET_TODOS 
                })

                if (!existing) return

                cache.writeQuery({
                    query: GET_TODOS,
                    data: {
                        todos: [newTodo, ...existing.todos],
                    }
                })
            }
        })
    } 
    catch (e: any) {
        error.value = e.message ?? 'Failed to add todo' 
        todos.value = todos.value.filter(t => t.id !== tempTd) // Rollback on failure
    }
  }

  async function toggleTodo(todo: Todo) { // Update Data( Local update + mutation)
    const targetStatus = !todo.is_done
    // Optimistic UI update
    todo.is_done = targetStatus

    try {
        await apolloClient.mutate({
          mutation: TOGGLE_TODO,
          variables: {
            id: todo.id,
            is_done: targetStatus,
          },

          update (cache) {
            const existing = cache.readQuery<GetTodosResult>({ 
                query: GET_TODOS 
            })
            if (!existing) return
            
            const updated = existing.todos.map((t: any) =>
                t.id === todo.id ? { ...t, is_done: targetStatus } : t
            )
            cache.writeQuery({
                query: GET_TODOS,
                data: {
                    todos: updated,
                }
            })
          }
        })
    }
    catch (e: any) {
        error.value = e.message ?? 'Failed to update todo'
        todo.is_done = !targetStatus // Rollback on failure
    }
  }

  async function deleteTodo(id: string) { // Delete Data (Local delete + mutation)
    const backupIndex = todos.value.findIndex(t => t.id === id)
    
    if (backupIndex === -1) return // Not found, nothing to do
    const backupTodo = todos.value[backupIndex]
    
    todos.value = todos.value.filter(t => t.id !== id) // Optimistic UI update
    
    try {
        await apolloClient.mutate({
          mutation: DELETE_TODO,
          variables: {
            id,
          },

          update (cache) {
            const existing = cache.readQuery<GetTodosResult>({ 
                query: GET_TODOS 
            })
            if (!existing) return

            cache.writeQuery({
                query: GET_TODOS,
                data: {
                    todos: existing.todos.filter(t => t.id !== id)
                }
            })
          }
        })
    }
    catch (e: any) {
        error.value = e.message ?? 'Failed to delete todo'
        if (backupTodo){
            todos.value.splice(backupIndex, 0, backupTodo)
        }
    }
  }

  function startRealtime() { // Real-time updates with GraphQL Subscriptions
    const obs = apolloClient.subscribe<{ todos: Todo[] }>({
      query: TODOS_SUB,
    })

    const sub = obs.subscribe({
      next({ data }) {
        if (data?.todos) {
            const tempItems = todos.value.filter(t => t.id.startsWith('temp-'))
          todos.value = [...data.todos, ...tempItems]
        }
      },
      error: (e) =>{
        console.error('Subscription error', e)
        error.value = 'Realtime synchronization failed'
      },
    })

    return () => sub.unsubscribe()
  }

  const filteredTodos = computed(() => { // Computed property for filtering todos
    if (filter.value == 'active') {
        return todos.value.filter(t => !t.is_done)
    } else if (filter.value == 'done') {
        return todos.value.filter(t => t.is_done)
    }
    return todos.value
  }) 

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    startRealtime,
    filter,
    filteredTodos,
  }
})