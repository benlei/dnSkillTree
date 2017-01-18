import Axios from 'axios';
import * as types from '../mutation-types';

const state = {
  jobs: [],
};

const getters = {
  jobList: () => state.jobs,
};

const actions = {
  loadJobs({ commit }) {
    const url = `${process.env.ASSETS_URL}/ext/jobs.json`;

    Axios.get(url)
      .then(response => response.data)
      .then(jobs => commit(types.SAVE_JOBS, { jobs }));
  },
};

const mutations = {
  [types.SAVE_JOBS]($state, { jobs }) {
    state.jobs = state.jobs.slice(state.jobs.length).concat(jobs);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
