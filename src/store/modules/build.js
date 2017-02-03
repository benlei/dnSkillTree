import * as types from '../mutation-types';

const state = {
  ascendancy: 0,
  levels: [],
  title: 'MAZE',
  mode: 0,
  active: -1,
};

const getters = {
  active(state, getters, State, Getters) {
    if (state.active === -1 && Getters.tree.length) {
      const tree = Getters.tree[0];
      for (let i = 0; i < 4; i += 1) {
        if (tree[i] !== null) {
          return tree[i];
        }
      }
    }

    return state.active;
  },

  skill(state, getters, State, Getters) {
    return Getters.skills[getters.active];
  },

  name(state, getters, State, Getters) {
    return Getters.messages[getters.skill.name];
  },

  levelIndex(state, getters) {
    const index = (getters.skill.jobIndex * 24) + getters.skill.slot;
    return state.levels[index] || 0;
  },

  level(state, getters) {
    if (getters.skill.levelReq[0] === 1) {
      return 1 + getters.levelIndex;
    }

    return getters.levelIndex;
  },

  spCost(state, getters) {
    return getters.skill.sp[getters.levelIndex];
  },

  spCostTotal(state, getters) {
    return getters.skill.spTotal[getters.levelIndex];
  },

  hpCost(state, getters) {
    return getters.skill.hp[state.mode][getters.levelIndex];
  },

  mpCost(state, getters) {
    return getters.skill.mp[state.mode][getters.levelIndex];
  },

  type(state, getters) {
    const type = getters.skill.type;
    const durationType = getters.skill.durationType;

    if (!type) {
      switch (durationType) {
        case 0:
          return 'Instant';
        case 1:
          return 'Buff';
        case 2:
          return 'Debuff';
        default:
          break;
      }
    } else if (type === 3) {
      return 'Passive Enhanced';
    }

    return 'Passive';
  },

  attribute(state, getters) {
    switch (getters.skill.element) {
      case 0:
        return 'Fire';
      case 1:
        return 'Water';
      case 2:
        return 'Light';
      case 3:
        return 'Dark';
      default:
        break;
    }

    return 'None';
  },

  cooldown(state, getters) {
    if (getters.skill.cdOverride) {
      return getters.skill.cdOverride[state.mode];
    }

    return getters.skill.cd[state.mode][getters.levelIndex];
  },

  weapons(state, getters, State, Getters) {
    const weapons = getters.skill.weapons;
    if (weapons) {
      return weapons.map(n => Getters.messages[Getters.weaponMap[n]]);
    }

    return null;
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
