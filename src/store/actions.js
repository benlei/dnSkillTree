import Axios from 'axios';
import * as types from './mutation-types';
import * as storage from '../lib/storage';

export default {
  loadJobs({ commit, dispatch }) {
    const url = `${process.env.ASSETS_URL}/ext/jobs.json`;

    dispatch('reset');
    dispatch('resetJob');
    dispatch('setTitle', 'MAZE');

    if (storage.contains(url)) {
      commit(types.INIT_JOBS, { data: storage.get(url) });
    } else {
      Axios.get(url)
        .then(response => response.data)
        .then((data) => {
          storage.put(url, data);
          commit(types.INIT_JOBS, { data });
        });
    }
  },

  loadJob({ commit, dispatch }, { slug, path }) {
    const url = `${process.env.ASSETS_URL}/ext/${slug}.json`;

    dispatch('resetJobs');
    dispatch('setDesired', slug);

    if (storage.contains(url)) {
      dispatch('initJob', { data: storage.get(url), path });
    } else {
      Axios.get(url)
        .then(response => response.data)
        .then((data) => {
          storage.put(url, data);

          dispatch('initJob', { data, path });
        });
    }
  },

  setTitle({ commit }, title) {
    commit(types.SET_TITLE, title);
  },
};
