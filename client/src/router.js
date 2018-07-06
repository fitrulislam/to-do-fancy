import Vue from 'vue'
import Router from 'vue-router'
import SignUp from './views/SignUp.vue'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import SignIn from './views/SignIn.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        let status = localStorage.getItem('status')
        if (status === 'connected') {
          next('/dashboard')
        } else {
          next()
        }
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      beforeEnter: (to, from, next) => {
        let status = localStorage.getItem('status')
        if (status === 'connected') {
          next('/dashboard')
        } else {
          next()
        }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      beforeEnter: (to, from, next) => {
        let status = localStorage.getItem('status')
        if (status === 'connected') {
          next('/dashboard')
        } else {
          next()
        }
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        let status = localStorage.getItem('status')
        if (status !== 'connected') {
          next('/signin')
        } else {
          next()
        }
      }
    }
  ]
})
