import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import jobs from './modules/jobs';
import job from './modules/job';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  modules: {
    jobs,
    job,
  },
});
