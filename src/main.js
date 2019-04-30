import Vue from 'vue'
import App from './App.vue'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false
//导入公共样式
import './assets/statics/site/css/style.css'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

//写组件
import index from './components/index'
//写规则
const  routes = [
    {
        path: '/index',
        component: index
    }
]
//实例话路由对象
const router = new VueRouter({
    routes
})



new Vue({
  render: h => h(App),
    router
}).$mount('#app')
