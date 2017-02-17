import Vue from 'vue';

import router from './router';
import store from './store';

import './mixins/index';

const app = new Vue({
  store,
  router,
});

app.$mount('#app');
