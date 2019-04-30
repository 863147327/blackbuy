import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//导入公共样式
import './assets/statics/site/css/style.css'


new Vue({
  render: h => h(App),
}).$mount('#app')
