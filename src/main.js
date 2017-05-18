// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import ElementUI from 'element-ui'
import NProgress from 'nprogress';
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import store from './store'
import Cookies from 'js-cookie'
import axios from 'axios'

const token = Cookies.get('X-Tomee-Token');

axios.defaults.timeout = 5000;
//axios.defaults.headers.common['Authorization'] = token;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(
    config => {
        if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `${token}`;
            console.log('1')
            axios.defaults.headers.common['X-Tomee-Token'] = token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */

//this.$router.push("/login");

//if the web has token ,then will don't route to login page
//if the web does not have token ,then will redirect to login
//but there are not cut the route if the user doesn't have the root
const whiteList = ['/login'];// 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (Cookies.get('X-Tomee-Token')) {
        //axios.defaults.headers['X-Tomee-Token'] = Cookies.get('X-Tomee-Token');
        //alert("用时已超过，请重新登录")
        if (to.path === '/login') {
            next({path: '/人员信息管理/内部人员信息管理'});
        } else {
            next();
            /*if (to.meta && to.meta.role) {
             if (hasPermission(store.getters.roles, to.meta.role)) {
             next();
             } else {
             next('/404');
             }
             } else {
             next();
             }*/
        }
    } else {
        //alert('no token')
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login');
            NProgress.done(); // 在hash模式下 改变手动改变hash 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
        }
    }
});
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: {App}
})
