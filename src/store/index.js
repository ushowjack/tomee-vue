/**
 * Created with ES6.
 * User: Ushow Jack/youshoujie@tomee.cn
 * Date: 2017/5/15
 * Time: 11:07
 */
"use strict"
import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie';

Vue.use(Vuex)

const state = {
    token: Cookies.get('X-Tomee-Token')
};

const getters = {
    getToken: state => {
        return state.token;
    }
};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    }
};

const actions = {
    loginIn({commit}, token){
        Cookies.set('X-Tomee-Token', token);
        commit('setToken', token);
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store
