import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment-timezone'

import 'nprogress/nprogress.css'
import './assets/css/reset.styl'

Vue.config.productionTip = false

Vue.filter('timeformat', (value: string | number, format: string = 'YYYY-MM-DD HH:mm:ss'): string => moment(value).format(format))

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
