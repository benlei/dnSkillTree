import Axios from 'axios';
import * as types from './mutation-types';

export default {
  loadJobs({ commit }) {
    const url = `${process.env.ASSETS_URL}/ext/jobs.json`;

    Axios.get(url)
      .then(response => response.data)
      .then((data) => {
        commit(types.INIT_JOBS, { data });
      });
  },

  loadJob({ commit, dispatch }, slug) {
    const url = `${process.env.ASSETS_URL}/ext/${slug}.json`;

    Axios.get(url)
      .then(response => response.data)
      .then((data) => {
        commit(types.INIT_JOB, { ...data });
        dispatch('setTitle', data.ascendancies[2].name);
      });
  },

  setTitle({ commit }, title) {
    commit(types.SET_TITLE, title);
    document.title = title;
  },
};
