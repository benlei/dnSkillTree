import Vue from 'vue';
import Vuex from 'vuex';
import jobs from './modules/jobs';
import tree from './modules/tree';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    jobs,
    tree,
  },
});
