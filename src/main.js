import Vue from 'vue'
import {Menu, Button, Layout} from 'ant-design-vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Menu)
Vue.use(Button)
Vue.use(Layout)


new Vue({
    render: h => h(App),
}).$mount('#app')
