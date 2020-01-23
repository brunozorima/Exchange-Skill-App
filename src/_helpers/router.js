import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../home/HomePage'
import LoginPage from '../Login/LoginPage'
import RegisterPage from '../register/RegisterPage'
import ProfilePage from '../profile/Profile'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/profile', component: ProfilePage },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  
// try to access a restricted page + not logged in
  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})