//The vuex users module is in charge of the users section of the centralised state store. It contains actions for fetching all users from the api and deleting a user,
// and contains mutations for each of the lower level state changes involved in each action.
import { userService } from '../services';
import { acccount } from './account.module';

const state = {
    all: {},
    user: {},
    allUsers:[]
};

const actions = {
    //get all users
    getAll({ commit }) {
        commit('getAllRequest');

        userService.getAll()
            .then(
                users => commit('getAllSuccess', users),
                error => commit('getAllFailure', error)
            );
    },
    //get a user based on an id
    getUserById({commit}, id) {
        commit('getUserByIdRequest', id);

        userService.getById(id)
            .then(
                user => commit('getUserByIdSuccess', user),
                error => commit('getUserByIdFailure', error)
            );
    },
    //update a user
    updateUser({commit}, user) {
        commit('updateUserRequest', user);

        userService.update(user)
            .then(
                user => commit('updateUserSuccess', user),
                error => commit('updateUserFailure', error)
            );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        userService.delete(id)
            .then(
                user => commit('deleteSuccess', id),
                error => commit('deleteFailure', { id, error: error.toString() })
            );
    }
};

const mutations = {
    updateUserRequest(state, _user){
        state.user = _user;
    },
    updateUserSuccess(state, _u){
        state.user = {updateUser: _u};
        return _u;
    },
    updateUserFailure(state, err){
        state.user = {updateUSerFail: err};
    },
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, users) {
        // users = users.filter(user => user.userDetails.id !== acccount.state.user.id)
        // state.all = { items:  };
        state.all = { items: users };
        state.allUsers = users;
        
        
        // if(state.user.id > 0){
        //     var userLeft = users.filter(function (u) {
        //         return u.userDetails != state.user
        //     })
        //     state.all = { items: userLeft };
        // }  
        // else {
        //     state.all = { items: users };
        // }     
        
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    getUserByIdRequest(state, _user){
      state.user = _user;
    },
    getUserByIdSuccess(state, user){
        state.user = user;
    },
    getUserByIdFailure(state, error){
        state.user = error;
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(user =>
            user.id === id
                ? { ...user, deleting: true }
                : user
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(user => user.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.items = state.items.map(user => {
            if (user.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: error };
            }

            return user;
        })
    }
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};