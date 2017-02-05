import Vue from 'vue';
import * as types from '../mutation-types';
import parameterize from '../../lib/parameterize';
import Level from '../../lib/level';

// const chars = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_'.split('');
// const charsT = Object.assign({}, chars);

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

  skill: (state, getters, State, Getters) => Getters.skills[getters.active],

  name: (state, getters, State, Getters) => Getters.messages[getters.skill.name],

  meta(state, getters) {
    const skill = getters.skill;
    const level = Math.max(1, Level.valueOf(state.levels, skill));
    const displayLevel = Math.max(1, Level.valueOf(state.levels, skill));
    const index = Level.indexOf(level);
    const maxLevel = skill.maxLevel - skill.spMaxLevel;
    const spTotal = level ? skill.spTotal[index] : 0;
    const hp = skill.hp[state.mode][index];
    const mp = skill.mp[state.mode][index];
    const cd = skill.cdOverride ? skill.cdOverride[state.mode] : skill.cd[state.mode][index];

    return {
      level: displayLevel,
      maxLevel,
      spTotal,
      hp,
      mp,
      cd,
    };
  },

  isStarter: (state, getters) => getters.skill.levelReq[0] === 1,

  levelIndex(state, getters) {
    const index = (getters.skill.jobIndex * 24) + getters.skill.slot;
    return state.levels[index] || 0;
  },

  nextLevelIndex(state, getters) {
    const nextIndex = getters.levelIndex + 1;
    if (nextIndex === getters.skill.maxLevel) {
      return getters.levelIndex;
    }

    return nextIndex;
  },

  spCost(state, getters) {
    if (getters.isStarter === 1) {
      return getters.skill.sp[getters.nextLevelIndex];
    }

    return getters.skill.sp[getters.levelIndex];
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

  weapons(state, getters, State, Getters) {
    const weapons = getters.skill.weapons;
    const messages = Getters.messages;
    const weaponMap = Getters.weaponMap;

    if (weapons) {
      return weapons.map(n => messages[weaponMap[n]]);
    }

    return null;
  },

  description(state, getters, State, Getters) {
    const descriptionId = getters.skill.description[state.mode][getters.levelIndex];
    const str = Getters.messages[descriptionId];
    const params = getters.skill.params[state.mode][getters.levelIndex];

    return parameterize(str, params, Getters.messages);
  },

  levelUpReq(state, getters) {
    if (!getters.level) {
      return getters.skill.levelReq[0];
    }

    return getters.skill.levelReq[getters.nextLevelIndex];
  },

  parentSkills(state, getters) {
    return getters.skill.parents;
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

  setLevel({ commit, rootState }, { skillId, levelIndex }) {
    const jobIndex = rootState.job.skills[skillId].jobIndex;
    const slot = rootState.job.skills[skillId].slot;
    const index = (jobIndex * 24) + slot;
    commit(types.SET_SKILL_LEVEL, { index, levelIndex });
    commit(types.SET_ACTIVE, skillId);
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

  [types.SET_SKILL_LEVEL](state, { index, levelIndex }) {
    Vue.set(state.levels, index, levelIndex);
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
