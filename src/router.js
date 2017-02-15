import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/App';
import DesktopHomeApp from './components/desktop/home/DesktopHomeApp';
import DesktopTreeApp from './components/desktop/tree/DesktopTreeApp';
import MobileHomeApp from './components/mobile/home/MobileHomeApp';
import MobileTreeApp from './components/mobile/tree/MobileTreeApp';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: App,
    children: [
      { path: '', component: DesktopHomeApp, name: 'desktop-home' },
      {
        path: ':slug([a-z]{2,})',
        name: 'desktop',
        component: DesktopTreeApp,
        children: [
          {
            path: ':path',
            name: 'desktop-build',
          },
        ],
      },

      { path: 'm', component: MobileHomeApp, name: 'mobile-home' },
      {
        path: 'm/:slug([a-z]{2,})',
        name: 'mobile',
        component: MobileTreeApp,
        children: [
          {
            path: ':path',
            name: 'mobile-build',
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
