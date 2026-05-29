<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTodoStore } from '@/stores/todo.store'

const todoStore = useTodoStore()

const title = ref('')

let stopRealtime: (() => void) | null = null

onMounted(async () => {
  await todoStore.fetchTodos()
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => {
  stopRealtime?.()
})

async function onAdd() {
  if (!title.value.trim()) return // Don't add empty items
  await todoStore.addTodo(title.value.trim())
  title.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
    <div class="max-w-md mx-auto bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 overflow-hidden">
      
      <!-- App Header -->
      <div class="p-6 bg-gradient-to-r from-indigo-500 to-violet-600">
        <h1 class="text-2xl font-bold text-white tracking-tight">Task Manager</h1>
        <p class="text-indigo-100 text-sm mt-1">Realtime Hasura Synchronized</p>
      </div>

      <div class="p-6 space-y-6">
        <!-- Input Form -->
        <form @submit.prevent="onAdd" class="flex gap-2">
          <input 
            v-model="title" 
            placeholder="What needs to be done?" 
            class="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
          />
          <button 
            type="submit"
            class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium rounded-xl text-sm transition-colors shadow-sm shadow-indigo-200 flex items-center justify-center"
          >
            Add
          </button>
        </form>

        <!-- Global Feedback Messaging -->
        <div v-if="todoStore.loading && todoStore.filteredTodos.length === 0" class="flex items-center justify-center py-6 text-slate-400 text-sm gap-2">
          <svg class="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading your stack...
        </div>

        <div v-if="todoStore.error" class="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-medium">
           {{ todoStore.error }}
        </div>

        <!-- Task Filtering Tabs -->
        <div class="flex bg-slate-100 p-1 rounded-xl">
          <button 
            type="button"
            @click="todoStore.filter = 'all'"
            :class="[
              'flex-1 text-center py-1.5 rounded-lg text-xs font-semibold transition-all duration-150',
              todoStore.filter === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            ]"
          >
            All
          </button>
          <button 
            type="button"
            @click="todoStore.filter = 'active'"
            :class="[
              'flex-1 text-center py-1.5 rounded-lg text-xs font-semibold transition-all duration-150',
              todoStore.filter === 'active' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            ]"
          >
            Active
          </button>
          <button 
            type="button"
            @click="todoStore.filter = 'done'"
            :class="[
              'flex-1 text-center py-1.5 rounded-lg text-xs font-semibold transition-all duration-150',
              todoStore.filter === 'done' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            ]"
          >
            Done
          </button>
        </div>

        <!-- Todo List Area -->
        <ul v-if="todoStore.filteredTodos.length > 0" class="divide-y divide-slate-100 max-h-[400px] overflow-y-auto pr-1">
          <li 
            v-for="todo in todoStore.filteredTodos" 
            :key="todo.id"
            class="flex items-center justify-between py-3 group transition-all"
          >
            <label class="flex items-center space-x-3 cursor-pointer flex-1 min-w-0 pr-4">
              <input 
                type="checkbox" 
                :checked="todo.is_done"
                @change="todoStore.toggleTodo(todo)"
                class="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-0 transition-all cursor-pointer accent-indigo-600"
              />
              <span 
                :class="[
                  'text-sm transition-all duration-200 truncate',
                  todo.is_done ? 'line-through text-slate-400 font-normal' : 'text-slate-700 font-medium'
                ]"
              >
                {{ todo.title }}
              </span>
            </label>

            <!-- Delete Button -->
            <button 
              @click="todoStore.deleteTodo(todo.id)"
              class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all md:opacity-0 group-hover:opacity-100 focus:opacity-100"
              title="Delete task"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </li>
        </ul>

        <!-- Empty State Fallback -->
        <div v-else-if="!todoStore.loading" class="text-center py-8 px-4 border border-dashed border-slate-200 rounded-xl">
          <p class="text-slate-400 text-sm font-medium">No tasks found here</p>
          <p class="text-slate-300 text-xs mt-0.5">Enjoy your clean slate!</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Custom thin scrollbar styling for a cleaner look */
ul::-webkit-scrollbar {
  width: 4px;
}
ul::-webkit-scrollbar-track {
  background: transparent;
}
ul::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
ul::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>