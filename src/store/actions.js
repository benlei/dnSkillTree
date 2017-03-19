import Axios from 'axios';
import * as types from './mutation-types';
import * as storage from '../lib/storage';

export default {
  loadJobs({ commit, dispatch }) { // go to HOME
    const url = `${process.env.ASSETS_URL}/ext/jobs.json`;

    dispatch('resetJobs');
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

  loadJob({ dispatch }, { slug, path }) { // go to TREE
    const url = `${process.env.ASSETS_URL}/ext/${slug}.json`;

    dispatch('reset');
    dispatch('resetJob');
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
