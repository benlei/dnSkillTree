import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeApp from './components/home/HomeApp';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: HomeApp,
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
