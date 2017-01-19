import * as types from '../mutation-types';

const state = {
  list: [],
};

const mutations = {
  [types.INIT_JOBS](state, { data }) {
    state.list = state.list.slice(state.list.length).concat(data);
  },
};

export default {
  state,
  mutations,
};
