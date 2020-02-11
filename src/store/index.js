//This is the main vuex store file that configures the store with all of the above vuex modules.
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { alert } from './alert.module';
import { account } from './account.module';
import { users } from './users.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users
    }
});