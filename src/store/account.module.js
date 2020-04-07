//The vuex account module is in charge of the account section of the centralised state store. 
//It contains actions for registering a new user, logging in and logging out of the tutorial application, 
//and contains mutations for each of the lower level state changes involved for each account action.
import { userService } from '../services';
import { router } from '../helpers';

const user = JSON.parse(JSON.stringify(localStorage.getItem('user')));
const state = {
    user:{},
    isLoggedIn: {}
};
const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
    
        userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/dashboard');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
    
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess');
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    loginRequest(state, user) {
        state.isLoggedIn = {Loading: true};
        state.user = user;
    },
    loginSuccess(state, user) {
        state.isLoggedIn = true;
        state.user =  user;
    },
    loginFailure(state) {
        state.isLoggedIn = false;
        state.user = null;
    },
    logout(state) {
        state.isLoggedIn = false;
        state.user = null;
    },
    registerRequest(state) {
        state.status = { registering: true };
    },
    registerSuccess(state) {
        state.isLoggedIn = false;
    },
    registerFailure(state) {
        state.isLoggedIn = false;
    }
};
const getters = {
    loggedUserId: state => {
        return state.user.id
    },
    isLoggedIn: state => {
        return state.isLoggedIn
    }
};
export const account = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};