import * as types from '../mutation-types';

const state = {
  ascendancy: 0,
  levels: [],
  title: 'MAZE',
  mode: 0,
  active: -1,
};

const getters = {
  active(state, getters, rootState) {
    if (state.active === -1 && rootState.job.tree.length) {
      const tree = rootState.job.tree[0];
      for (let i = 0; i < 4; i += 1) {
        if (tree[i] !== null) {
          return tree[i];
        }
      }
    }

    return state.active;
  },
};

const actions = {
  softReset({ commit }) {
    commit(types.SOFT_RESET);
  },

  setAscendancy({ commit }, ascendancy) {
    commit(types.SET_ASCENDANCY, ascendancy);
  },

  setTitle({ commit }, title) {
    commit(types.SET_TITLE, title);
    document.title = title;
  },

  setActive({ commit }, skillId) {
    commit(types.SET_ACTIVE, skillId);
  },

  setLevel({ commit, rootState }, skillId, level) {
    const jobIndex = rootState.job.skills[skillId].jobIndex;
    const slot = rootState.job.skills[skillId].slot;
    const index = (jobIndex * 24) + slot;
    commit(types.SET_SKILL_LEVEL, index, level);
  },

  setMode({ commit }, mode) {
    commit(types.SET_MODE, mode);
  },
};

const mutations = {
  [types.SET_ASCENDANCY](state, ascendancy) {
    state.ascendancy = ascendancy;
  },

  [types.SOFT_RESET](state) {
    state.ascendancy = 0;
    state.levels = {};
    state.mode = 0;
    state.active = -1;
  },

  [types.SET_TITLE](state, title) {
    state.title = title;
  },

  [types.SET_ACTIVE](state, skillId) {
    state.active = skillId;
  },

  [types.SET_SKILL_LEVEL](state, index, level) {
    state.levels[index] = level;
  },

  [types.SET_MODE](state, mode) {
    state.mode = mode;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
