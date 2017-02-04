import Vue from 'vue';
import * as types from '../mutation-types';

function strParameterize(str, params, state, getters, State, Getters) {
  if (!str) {
    return str;
  }

  if (params) {
    params = params.split(',').map((p) => {
      if (p.startsWith('{')) {
        return Getters.messages[p.substring(1, p.length - 1)];
      }

      return p;
    });
  }

  for (let i = 0; i < params.length; i += 1) {
    str = str.replace(`{${i}}`, params[i]);
  }

  let c = 0;
  let w = 0;
  let newStr = '';
  let startPos = 0;

  for (let i = 0; i < str.length - 1; i += 1) {
    switch (str.substr(i, 2)) {
      case '#y':
      case '#p':
      case '#r':
      case '#s':
      case '#v':
        if (c - w === 1) { // needed a closing </span>
          newStr += `${str.substring(startPos, i)}</span><span class="${str.substr(i + 1, 1)}">`;
        } else {
          newStr += `${str.substring(startPos, i)}<span class="${str.substr(i + 1, 1)}">`;
          c += 1;
        }

        startPos = i + 2;
        i += 1;
        break;
      case '#w':
        if (w === c) { // early #w
          newStr += str.substring(startPos, i);
        } else {
          newStr += `${str.substring(startPos, i)}</span>`;
          w += 1;
        }

        startPos = i + 2;
        i += 1;
        break;
      default:
        break;
    }
  }

  newStr += str.substr(startPos);

  if (c !== w) {
    newStr = `${newStr}</span>`;
  }

  return newStr.replace(/\\n/g, '<br />');
}

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

  isStarter: (state, getters) => getters.skill.levelReq[0] === 1,
  levelIndex(state, getters) {
    const index = (getters.skill.jobIndex * 24) + getters.skill.slot;
    return state.levels[index] || 0;
  },

  level(state, getters) {
    if (getters.isStarter === 1) {
      return 1 + getters.levelIndex;
    }

    return getters.levelIndex;
  },

  nextLevelIndex(state, getters) {
    const nextIndex = getters.levelIndex + 1;
    if (nextIndex === getters.skill.maxLevel) {
      return getters.levelIndex;
    }

    return nextIndex;
  },

  sp: (state, getters) => getters.skill.sp[getters.levelIndex],
  spTotal: (state, getters) => getters.skill.spTotal[getters.levelIndex],

  spCost(state, getters) {
    if (getters.isStarter === 1) {
      return getters.skill.sp[getters.nextLevelIndex];
    }

    return getters.skill.sp[getters.levelIndex];
  },

  hpCost: (state, getters) => getters.skill.hp[state.mode][getters.levelIndex],
  mpCost: (state, getters) => getters.skill.mp[state.mode][getters.levelIndex],
  softMaxLevel: (state, getters) => getters.skill.maxLevel - getters.skill.spMaxLevel,

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

  description(state, getters, State, Getters) {
    const descriptionId = getters.skill.description[state.mode][getters.levelIndex];
    const str = Getters.messages[descriptionId];
    const params = getters.skill.params[state.mode][getters.levelIndex];

    return strParameterize(str, params, state, getters, State, Getters);
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
