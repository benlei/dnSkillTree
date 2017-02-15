import * as types from '../mutation-types';

const state = {
  list: [],
  loaded: false,
};

const mutations = {
  [types.INIT_JOBS](state, { data }) {
    state.list = data;

    state.loaded = true;
  },
};

export default {
  state,
  mutations,
};
