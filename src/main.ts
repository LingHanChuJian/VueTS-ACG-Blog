import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Message from '@/components/message'

import moment from 'moment'

import 'nprogress/nprogress.css'
import './assets/css/reset.styl'

Vue.config.productionTip = false

// 全局提示
Vue.prototype.$Message = Message

// 设置浏览器标题
Vue.prototype.$Title = (title: string) => {
  document.title = title
}

// 修改日历令牌
moment.calendarFormat = (m: moment.Moment, now: moment.Moment) => {
  const diff: number = m.diff(now, 'day', true)
  return diff < 1 && diff > 0 ? 'sameDay' : diff < 0 && diff > -1 ? 'lastDay' : diff < 0 && diff > -31 ? 'lastMonth' : 'sameElse'
}

// 日期格式化
Vue.filter('format', (value: string | number, format: string = 'YYYY-MM-DD HH:mm:ss'): string => moment(value).format(format))

// 日期差值
Vue.filter('diff', (value: string | number): string => moment(value).calendar(new Date(), { sameDay: '今天', lastDay: '昨天', lastMonth: (): string => `${moment.duration(moment(new Date()).diff(moment(value))).days()} 天前` , sameElse: 'YYYY-MM-DD HH:mm:ss' }))

// 计算存活时间
Vue.filter('computeLiveTime', (value: string | number): string => {
  const diff: number =  moment(new Date()).diff(moment(new Date(value)))
  const duration: moment.Duration = moment.duration(diff)
  return `${Math.floor(duration.asDays())} 天 ${duration.hours()} 小时 ${duration.minutes()} 分钟 ${duration.seconds()} 秒`
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
