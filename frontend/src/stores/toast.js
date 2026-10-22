import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({ notification: null, sequence: 0 }),
  actions: {
    show(title, message, duration = 10000) {
      const id = ++this.sequence
      this.notification = { id, title, message }
      setTimeout(() => {
        if (this.notification?.id === id) this.notification = null
      }, duration)
    }
  }
})
