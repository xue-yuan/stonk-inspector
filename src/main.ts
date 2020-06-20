import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import 'bootstrap';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
// axios.defaults.withCredentials = true;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
