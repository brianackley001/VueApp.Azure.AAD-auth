import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from '@/stores/auth'
import { hook, route, VueNavigationClient } from './helpers'

// ---------------------------------------------------------------------------------------------------------------------
// setup
// ---------------------------------------------------------------------------------------------------------------------

// special routes
const unmatched = '/:pathMatch(.*)*'
const unguarded = [
  '/',
  '/login',
  '/logout',
]

// create router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    hook('/login', auth.login),
    hook('/logout', auth.logout),
    route(unmatched, '404'),
  ]
})


// ---------------------------------------------------------------------------------------------------------------------
// authentication
// ---------------------------------------------------------------------------------------------------------------------

// hook MSAL into router
const client = new VueNavigationClient(router)

// set up auth and guard routes
router.beforeEach(async (to, from, next) => {
  // 404
  if (to.matched[0]?.path === unmatched) {
    return next()
  }

  // guarded
  const guarded = unguarded.every(path => path !== to.path)
  if (guarded) {
    // initialized
    if (!auth.initialized) {
      await auth.initialize(client)
    }

    // authorised
    if (auth.account) {
      return next()
    }

    // unauthorised
    try {
      await auth.login()
      return next()
    }
    catch (err) {
      return next(false)
    }
  }

  // unguarded
  next()
})

export default router
