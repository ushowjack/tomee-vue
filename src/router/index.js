import Vue from 'vue'
import Router from 'vue-router'
import innerPersonMSG from '../components/context/innerPersonMSG.vue'
import symUser from '../components/context/symUser.vue'


Vue.use(Router)

export default new Router({
    routes: [
        //{
        //    path: '/人员信息管理',
        //    name: 'innerPersonMSG',
        //    component: innerPersonMSG
        //},
        {
            path: '/人员信息管理/内部人员信息管理',
            name: 'innerPersonMSG',
            component: innerPersonMSG
        },
        {
            path: '/人员信息管理/系统用户管理',
            name: 'symUser',
            component: symUser
        },

    ]
})
