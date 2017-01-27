import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import jobs from './modules/jobs';
import job from './modules/job';
import build from './modules/build';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  modules: {
    jobs,
    job,
    build,
  },
});
