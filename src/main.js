import Vue from 'vue'
import {Layout, Menu, Button} from 'ant-design-vue'

import App from './App.vue'
import router from './router'

Vue.use(Layout)
Vue.use(Menu)
Vue.use(Button)

Vue.config.productionTip = false


new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
