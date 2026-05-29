import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'
import { DefaultApolloClient } from '@vue/apollo-composable'

import App from './App.vue'
import './assets/main.css'
import { apolloClient } from './apollo/client.ts'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(createPinia())

app.mount('#app')
