import * as types from '../mutation-types';

const state = {
  ascendancy: 0,
};

const getters = {};

const actions = {
  changeAscendancy({ commit, state }, ascendancy) {
    commit(types.CHANGE_ASCENDANCY, ascendancy);
  },
};

const mutations = {
  [types.CHANGE_ASCENDANCY](state, ascendancy) {
    state.ascendancy = ascendancy;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
