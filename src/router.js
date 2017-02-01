import Vue from 'vue';
import VueRouter from 'vue-router';
import DesktopApp from './components/desktop/App';
import HomeApp from './components/desktop/home/App';
import TreeApp from './components/desktop/tree/App';
import MobileApp from './components/mobile/App';
import MobileHomeApp from './components/mobile/home/App';
import MobileTreeApp from './components/mobile/tree/App';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: DesktopApp,
    children: [
      {
        path: '',
        component: HomeApp,
      },
      {
        path: ':slug',
        component: TreeApp,
      },
    ],
  },
  {
    path: '/m/',
    component: MobileApp,
    children: [
      {
        path: '',
        component: MobileHomeApp,
      },
      {
        path: '/:slug',
        component: MobileTreeApp,
      },
    ],
  },
];

export default new VueRouter({
  routes,
});
