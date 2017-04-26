import Vue from 'vue'
import Router from 'vue-router'
import innerPersonMSG from '../components/context/innerPersonMSG.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/人员信息管理/内部人员信息管理',
            name: 'innerPersonMSG',
            component: innerPersonMSG
        }

    ]
})
