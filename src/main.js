import Vue from 'vue';
import router from './router';
import store from './store';

import './mixins';

const app = new Vue({
  store,
  router,
});

app.$mount('#app');
