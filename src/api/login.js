/**
 * Created with ES6.
 * User: Ushow Jack/youshoujie@tomee.cn
 * Date: 2017/5/15
 * Time: 10:30
 */
"use strict"
import { fetch } from 'utils/fetch';

export function loginByEmail(email, password) {
    const data = {
        email,
        password
    };
    return fetch({
        url: '/login/loginbyemail',
        method: 'post',
        data
    });
}

export function logout() {
    return fetch({
        url: '/login/logout',
        method: 'post'
    });
}


export function getInfo(token) {
    return fetch({
        url: '/user/info',
        method: 'get',
        params: { token }
    });
}