/**
 * Created with ES6.
 * User: Ushow Jack/youshoujie@tomee.cn
 * Date: 2017/5/15
 * Time: 10:25
 */
"use strict"

//import { loginByEmail, logout, getInfo } from 'api/login';
import Cookies from 'js-cookie';

const user = {
    state: {
        token: Cookies.get('X-Tomee-Token'),
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        }
    },
    actions: {
        Login({commit}, token){
            Cookies.set('X-Tomee-Token', token);
            commit('SET_TOKEN', token);
        }
    }

    /*     // 邮箱登录
     LoginByEmail({commit}, userInfo) {
     const email = userInfo.email.trim();
     return new Promise((resolve, reject) => {
     loginByEmail(email, userInfo.password).then(response => {
     const data = response.data;
     Cookies.set('X-Ivanka-Token', response.data.token);
     commit('SET_TOKEN', data.token);
     commit('SET_EMAIL', email);
     resolve();
     }).catch(error => {
     reject(error);
     });
     });
     },
     // 获取用户信息
     GetInfo({commit, state}) {
     return new Promise((resolve, reject) => {
     getInfo(state.token).then(response => {
     const data = response.data;
     commit('SET_ROLES', data.role);
     commit('SET_NAME', data.name);
     commit('SET_AVATAR', data.avatar);
     commit('SET_INTRODUCTION', data.introduction);
     resolve(response);
     }).catch(error => {
     reject(error);
     });
     });
     },
     // 登出
     LogOut({commit, state}) {
     return new Promise((resolve, reject) => {
     logout(state.token).then(() => {
     commit('SET_TOKEN', '');
     commit('SET_ROLES', []);
     Cookies.remove('X-Ivanka-Token');
     resolve();
     }).catch(error => {
     reject(error);
     });
     });
     }
     }*/
};

export default user;
