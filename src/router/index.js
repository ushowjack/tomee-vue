import Vue from 'vue'
import Router from 'vue-router'
import comtextbox from '../components/context/contextbox.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'comtextbox',
      component: comtextbox
    }
  ]
})
