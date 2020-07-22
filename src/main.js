import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { db } from './shared/db'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$db = db

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
