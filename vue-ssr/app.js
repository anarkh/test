import App from './App'
import Vue from 'vue'
import { createRouter } from './router'

export function createApp () {
  const router = createRouter()
  const app = new Vue({
    router,
    render: h => h(app)
  })

  return { app, router }
}
