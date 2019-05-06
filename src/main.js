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
import centerOrder from './components/centerOrder'
import centerContent from './components/centerContent'
import centerPerson from './components/centerPerson'
import centerOrderDetail from './components/centerOrderDetail'
import cart from './components/cart'
import login from './components/login'
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
        path: '/centerContent',
        component: centerContent,

        children: [
            {
                path: 'centerOrder',
                component: centerOrder
            },
            {
                path: '',
                component: centerPerson,
                meta: {
                    title: '会员中心',
                    type: 'login'
                },
            },
            {
                path: 'centerPerson',
                component: centerPerson
            },
            {
                path: 'centerOrderDetail',
                component: centerOrderDetail
            },
        ]
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/cart',
        component: cart,
        meta: {
            title: '购物车',
            type: 'login'
        }
    },

]
//实例话路由对象
const router = new VueRouter({
    routes
})
        router.beforeEach((to, from, next) => {
            const code = localStorage.getItem('code')
            console.log(code)
            if(code !== ''){
                if(JSON.parse(code)=='登录成功'){
                    next()
                }
            }else{
                if (to.meta.title) {
                    document.title = to.meta.title
                }
                const type = to.meta.type
                // 判断该路由是否需要登录权限
                if (type === 'login') {

                    Vue.prototype.$axios.get('/site/account/islogin')
                        .then(res=>{
                            if(res.data.code== 'login'){
                                next()
                            }else{
                                next('/login')
                            }
                        })

                } else {
                    next()  // 确保一定要有next()被调用
                }
            }
        })


new Vue({
  render: h => h(App),
    router
}).$mount('#app')
