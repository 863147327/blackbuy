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

//抽取axios
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://111.230.232.110:8899';

// 抽取过滤器
import moment from 'moment'
Vue.filter('formatTime',value=>{
    return moment(value).format('YYYY年MM月DD日')
})

//写组件
import index from './components/index'
import detail from './components/detail'
import cart from './components/cart'
import login from './components/login'
import member from './components/member'
//写规则
const  routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: index
    },
    {
        path: '/detail/:id',
        component: detail
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/cart/:id',
        component: cart
    },
    {
        path: '/member',
        component: member
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
