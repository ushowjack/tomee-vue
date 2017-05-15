// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'

Vue.use(ElementUI)
Vue.use(Vuex)
//import Vue from 'vue'
//import {
//    Dialog, Input, Message,MessageBox, MenuItemGroup, Form, FormItem, Table, TableColumn, Button, Select, Option
//} from 'element-ui'
//Vue.use(Dialog)
//Vue.use(Input)
//Vue.use(Select)
//Vue.use(Option)
//Vue.use(Message)
//Vue.use(MessageBox)
//Vue.use(MenuItemGroup)
//Vue.use(Form)
//Vue.use(FormItem)
//Vue.use(Table)
//Vue.use(TableColumn)
//Vue.use(Button)
Vue.config.productionTip = false

/* eslint-disable no-new */


new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
