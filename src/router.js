import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/App';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: App,
    // children: [
    //   {
    //     path: '',
    //     component: Hello
    //   }
    // ]
  },
];

export default new VueRouter({
  routes,
});
