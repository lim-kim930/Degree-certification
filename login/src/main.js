import Vue from 'vue/dist/vue.esm.js'
//导入自己的 .vue 组件
// 在这里，如果要在webpack中使用.vue组件，必须先安装对应的loader加载器，否则webpack处理不了这种文件
// vue-loader
import APP from '../src/components/App.vue'

// 导入路由模块
import VueRouter from 'vue-router'
import axios from 'axios'
Vue.prototype.axios = axios;
// 安装
Vue.use(VueRouter)
// 导入自己的路由规则模块，得到路由对象
import byQrCode from './components/login/byQrCode.vue'
import byPassword from './components/login/byPassword.vue'


// 创建路由对象，并把得到的路由对象，挂载到 VM 实例上
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/byPassword',
    },
    {
      path: '/byQrCode',
      name: 'byQrCode',
      component: byQrCode
    },
    {
      path: '/byPassword',
      name: 'byPassword',
      component: byPassword
    },
  ]
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// import { data } from 'jquery';

// const btn = {
//     template: '<h3>ddddd</h3>'
// }
// Vue.component('btn',btn)
const vm = new Vue({
  el: '#app',
  render: c => c(APP),
  // render: c => c(APP2),
  // render: c => c(APP3),
  // render: c => c(APP4),
  // methods: {
  //     c: function () {
  //         console.log(111);
  //     }
  // }
  router,
})