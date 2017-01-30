import * as types from '../mutation-types';

const state = {
  ascendancy: 0,
};

const getters = {};

const actions = {
  softReset({ commit }) {
    commit(types.SOFT_RESET);
  },

  changeAscendancy({ commit }, ascendancy) {
    commit(types.CHANGE_ASCENDANCY, ascendancy);
  },
};

const mutations = {
  [types.CHANGE_ASCENDANCY](state, ascendancy) {
    state.ascendancy = ascendancy;
  },

  [types.SOFT_RESET](state) {
    state.ascendancy = 0;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
