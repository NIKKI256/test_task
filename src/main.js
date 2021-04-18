import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/route'
import store from './store/index'
import ViewUI from 'view-design'
import ApiUsers from './plugins/users'
import ApiPosts from './plugins/posts'

import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ViewUI)
Vue.use(ApiUsers)
Vue.use(ApiPosts)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
