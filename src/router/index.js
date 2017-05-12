import Vue from 'vue'
import Router from 'vue-router'
import main from '../Main.vue'
import login from '../Login.vue'
const innerPersonMSG = resolve => require(['../components/context/innerPersonMSG.vue'], resolve);
const symUser = resolve => require(['../components/context/symUser.vue'], resolve);
const quitPerson = resolve => require(['../components/context/quitPerson.vue'], resolve);
const outSidePerson = resolve => require(['../components/context/outSidePerson.vue'], resolve);
const personArrange = resolve => require(['../components/context/personArrange.vue'], resolve);
const policeBoxManage = resolve => require(['../components/context/policeBoxManage.vue'], resolve);
const standArrange = resolve => require(['../components/context/standArrange.vue'], resolve);
const standRecord = resolve => require(['../components/context/standRecord.vue'], resolve);
const vacationApplicate = resolve => require(['../components/context/vacationApplicate.vue'], resolve);
const userLog = resolve => require(['../components/context/userLog.vue'], resolve);

//import innerPersonMSG from '../components/context/innerPersonMSG.vue'
//import symUser from '../components/context/symUser.vue'
//import quitPerson from '../components/context/quitPerson.vue'
//import outSidePerson from '../components/context/outSidePerson.vue'
//import personArrange from '../components/context/personArrange.vue'
//import policeBoxManage from '../components/context/PoliceboxManage.vue'
//import standArrange from '../components/context/StandArrange.vue'
//import standRecord from '../components/context/StandRecord.vue'
//import vacationApplicate from '../components/context/VacationApplicate.vue'
//import userLog from '../components/context/userLog.vue'


Vue.use(Router)



const router = new Router({
    routes: [
        {
            path: '/',
            name: '主页',
            component: main,
            children: [
                {
                    path: '人员信息管理/内部人员信息管理',
                    name: 'innerPersonMSG',
                    component: innerPersonMSG
                },
                {
                    path: '人员信息管理/系统用户管理',
                    name: 'symUser',
                    component: symUser
                },
                {
                    path: '人员信息管理/退伍人员管理',
                    name: 'quitPerson',
                    component: quitPerson
                },
                {
                    path: '日常管理/人员外出申请管理',
                    name: 'outSidePerson',
                    component: outSidePerson
                },
                {
                    path: '日常管理/人员上下排班管理',
                    name: 'personArrange',
                    component: personArrange
                },
                {
                    path: '岗哨管理/岗亭信息管理',
                    name: 'policeBoxManage',
                    component: policeBoxManage
                },
                {
                    path: '岗哨管理/站岗排班管理',
                    name: 'standArrange',
                    component: standArrange
                },
                {
                    path: '岗哨管理/站岗记录管理',
                    name: 'standRecord',
                    component: standRecord
                },
                {
                    path: '考勤管理',
                    name: 'vacationApplicate',
                    component: vacationApplicate
                },
                {
                    path: '日志管理',
                    name: 'userLog',
                    component: userLog
                }

            ]
        },
        {
            path: '/login',
            name: '登录页',
            component: login,
        }

    ]
})

export default router;