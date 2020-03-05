import state from './state';
import * as actions  from './action';
import * as mutations from './mutation';

export const exchange = {
    namespaced: true,
    state,
    actions,
    mutations
};


