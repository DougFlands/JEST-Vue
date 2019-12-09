import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Api from './api'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.prototype.$api = Api
Vue.use(ElementUI);
Vue.config.errorHandler = function (err, vm, info) {
  console.log(err);
  console.log(vm);
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
