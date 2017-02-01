import * as types from '../mutation-types';

const state = {
  ascendancy: 0,
  levels: {},
  title: 'MAZE',
};

const getters = {
};

const actions = {
  softReset({ commit }) {
    commit(types.SOFT_RESET);
  },

  changeAscendancy({ commit }, ascendancy) {
    commit(types.CHANGE_ASCENDANCY, ascendancy);
  },

  setTitle({ commit }, title) {
    commit(types.SET_TITLE, title);
    document.title = title;
  },
};

const mutations = {
  [types.CHANGE_ASCENDANCY](state, ascendancy) {
    state.ascendancy = ascendancy;
  },

  [types.SOFT_RESET](state) {
    state.ascendancy = 0;
    state.levels = {};
  },

  [types.SET_TITLE](state, title) {
    state.title = title;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
