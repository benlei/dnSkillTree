import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/home/Home';
import Tree from './components/tree/Tree';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/:slug',
    component: Tree,
  },
];

export default new VueRouter({
  routes,
});
