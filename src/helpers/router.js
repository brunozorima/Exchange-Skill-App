import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Register from '../views/Register'
import Dashboard from '../views/Dashboard'
import Profile from '../components/UserDetails'
import UserProfilePage from '../views/UserPages/UserProfilePage'
import WantedPeopleList from '../components/WantedPeopleList'
import PeopleOwnedSkillList from '../components/PeopleOwnedSkillList'
import Message from '../components/ExchangeComponents/Messages'

//this is original router file

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/members/profile',
    name: 'Profile',
    component: Profile,
    meta: { 
      requiresAuth: true
    },
    props: true
  },
  {
    path: '/user/:id',
    name: 'UserProfilePage',
    component: UserProfilePage,
    props: true
  },
  {
    path: '/skills/:skillId/wantedPeople',
    name: 'WantedPeopleList',
    component: WantedPeopleList,
    props: true
  },
  {
    path: '/skills/:skillId/ownedByPeople',
    name: 'PeopleOwnedSkillList',
    component: PeopleOwnedSkillList,
    props: true
  },
  {
    path:'/exchange/:exchangeId',
    name: 'Message',
    component: Message,
    props: true
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }, 
    // otherwise redirect to home
    { path: '*', redirect: '/' }
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/signup','/', '/about'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // try to access a restricted page + not logged in
  if (authRequired && !loggedIn) {
    return next('/login')
  }
  else {
    next() 
  }
})

//export default router
