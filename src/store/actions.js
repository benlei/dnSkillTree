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
  loadJob({ commit }, slug) {
    const url = `${process.env.ASSETS_URL}/ext/${slug}.json`;

    Axios.get(url)
      .then(response => response.data)
      .then(data => commit(types.INIT_JOB, { ...data }));
  },
};
