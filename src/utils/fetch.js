/**
 * Created with ES6.
 * User: Ushow Jack/youshoujie@tomee.cn
 * Date: 2017/5/15
 * Time: 10:32
 */
"use strict"
import axios from 'axios';

export function fetch(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            timeout: 5000 // 超时
        });
        instance(options)
            .then(response => {
                const res = response.data;
                resolve(res);
            })
            .catch(error => {
                Message({
                    message: error,
                    type: 'error',
                    duration: 5 * 1000
                });
                console.log(error); // for debug
                reject(error);
            });
    });
}

