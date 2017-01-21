import * as types from '../mutation-types';

const state = {
  list: [],
};

const mutations = {
  [types.INIT_JOBS](state, { data }) {
    state.list = data;
  },
};

export default {
  state,
  mutations,
};
