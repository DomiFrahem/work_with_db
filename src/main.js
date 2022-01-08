import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VCalendar from "v-calendar";

Vue.config.productionTip = false

Vue.use(VCalendar,{
  componentPrefix: 'vc'
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
