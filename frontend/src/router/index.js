import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { layout: 'dashboard' }
  },
  {
    path: '/exercises',
    component: () => import('../views/LessonView.vue'),
    children: [
      { path: '', redirect: to => `${to.params.locale ? '/' + to.params.locale : ''}/exercises/text` },
      { path: 'text', name: 'exercise-text', component: () => import('../views/ExerciseTextView.vue') },
      { path: 'audio', name: 'exercise-audio', component: () => import('../views/ExerciseAudioView.vue') },
      { path: 'video', name: 'exercise-video', component: () => import('../views/ExerciseVideoView.vue') }
    ]
  },
  {
    path: '/practice',
    name: 'practice',
    component: () => import('../views/PracticeView.vue')
  },
  ...['writing', 'library', 'podcasts'].map(name => ({
    path: `/${name}`,
    name,
    component: () => import('../views/EmptyView.vue')
  }))
]

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/:locale(uz|ru)?',
    children: routes.map(route => ({ ...route, path: route.path.replace(/^\//, '') }))
  }],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.beforeEach((to, from) => {
  if (from.params.locale && !to.params.locale) {
    return { path: `/${from.params.locale}${to.path}`, query: to.query, hash: to.hash, replace: true }
  }
})
router.afterEach(to => { document.documentElement.lang = to.params.locale || 'en' })

export default router
