import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
    nativeLanguage: '',
    targetLanguage: '',
    level: 'A1',
    isAuthenticated: false
  }),
  actions: {
    register({ name, email, nativeLanguage, targetLanguage, level }) {
      this.name = name
      this.email = email
      this.nativeLanguage = nativeLanguage
      this.targetLanguage = targetLanguage
      this.level = level || 'A1'
      this.isAuthenticated = true
    },
    logout() {
      this.isAuthenticated = false
    }
  }
})
