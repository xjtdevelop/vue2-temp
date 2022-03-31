import Vue from 'vue'
import ElementUI, { Message as ElMessage } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgIcon from '@/components/SvgIcon.vue'
import './icons'
import { NetworkError } from '@/services/common/utils'
import { clearToken } from '@/services/common/token'
import SectionTitle from '@/components/SectionTitle'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.component('svg-icon', SvgIcon)
Vue.component('section-title', SectionTitle)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

window.addEventListener(
  'unhandledrejection',
  function browserRejectionHandler(event) {
    if (event.reason instanceof NetworkError) {
      event && event.preventDefault()
      ElMessage.error(event.reason.message)
      if (event.reason.response?.code === 1000) {
        if (!window.location.host.includes('localhost')) {
          clearToken()
          window.open('/#/login', '_self')
        }
      }
    }
  }
)
