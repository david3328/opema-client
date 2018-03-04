import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import App from './App.vue'

import {routes} from './routes'

Vue.use(VueRouter)
Vue.use(Vuetify)

const router = new VueRouter({routes})

router.beforeEach((to,from,next)=>{
  let currentUser = false;
  if(window.localStorage.getItem('Opema-Token')!=null){
    currentUser=true
  }
  let reqAuth =  to.meta.reqAuth;
  if(reqAuth){
    if(!currentUser){next('/login')}
    else{
      next()
    }
  }else if(currentUser){
    next('/admin')
  }else{
    next()
  }
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
