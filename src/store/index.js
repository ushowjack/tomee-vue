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
    token: ''
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
        let nowTime = new Date();
        nowTime = nowTime.getTime() + 2000000;
        const expiresTime = new Date(nowTime)
        //console.log(expiresTime)
        Cookies.set('X-Tomee-Token', token, {expires: expiresTime});
        commit('setToken', token);
        setTimeout(function () {
            commit('setToken', '');
            alert('time is over')
        }, 2000000);
    },
    clearToken({commit}){
        Cookies.set('X-Tomee-Token', '');
        commit('setToken', '');
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store
