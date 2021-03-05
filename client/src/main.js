import Vue from 'vue'
import App from '@/App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import '@/assets/custom.scss'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
