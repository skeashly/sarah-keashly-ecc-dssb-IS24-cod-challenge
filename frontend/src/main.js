import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

Vue.config.productionTip = false;

// Configure axios to use the backend URL
axios.defaults.baseURL = 'http://localhost:3000';

// Set up axios on the Vue instance
Vue.prototype.$axios = axios;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

