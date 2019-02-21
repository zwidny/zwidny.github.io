import Vue from 'vue'
import {Layout, Menu, Button} from 'ant-design-vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Button)

new Vue({
    render: h => h(App),
}).$mount('#app')
