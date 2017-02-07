import Vue from 'vue';
import * as types from '../mutation-types';
import parameterize from '../../lib/parameterize';
import Level from '../../lib/level';

// const chars = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_'.split('');
// const charsT = Object.assign({}, chars);

function initialState() {
  return {
    ascendancy: 0,
    levels: [],
    techs: [-1, -1, -1, -1, -1],
    crestTech: -1,
    crests: {},
    title: 'MAZE',
    mode: 0,
    active: -1,
  };
}

const state = initialState();

const getters = {
  spTotals(state, getters, State, Getters) {
    const levels = state.levels;
    const skills = Getters.skills;
    const tree = Getters.tree;
    const sp = [];

    for (let i = 0; i < levels.length; i += 1) {
      const level = levels[i];
      if (i % 24 === 0) {
        sp.push(0);
      }

      if (level === 0 || level) {
        const index = sp.length - 1;
        const slot = i % 24;
        const skill = skills[tree[index][slot]];
        const job = skill.job;

        sp[job] += skill.spTotal[level];
      }
    }

    return sp;
  },

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

  level: (state, getters) => Level.valueOf(state.levels, getters.skill),

  index: (state, getters) => Level.indexOf(getters.level),

  meta(state, getters) {
    const skill = getters.skill;
    const level = Math.max(1, getters.level);
    const index = Level.indexOf(level);

    const maxLevel = skill.maxLevel - skill.spMaxLevel;
    const spTotal = getters.level ? skill.spTotal[index] : 0;
    const hp = skill.hp[state.mode][index];
    const mp = skill.mp[state.mode][index];
    const cd = skill.cdOverride ? skill.cdOverride[state.mode] : skill.cd[state.mode][index];

    return {
      level,
      maxLevel,
      spTotal,
      hp,
      mp,
      cd,
    };
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

  next(state, getters) {
    const level = getters.level;
    const skill = getters.skill;
    const parents = skill.parents;
    let levelReq = 0;
    let spCost = 0;

    if (level >= skill.maxLevel) {
      const maxLevelIndex = Level.indexOf(skill.maxLevel);
      levelReq = skill.levelReq[maxLevelIndex];
      spCost = skill.sp[maxLevelIndex];
    } else if (!level) {
      levelReq = skill.levelReq[0];
      spCost = skill.sp[0];
    } else {
      levelReq = skill.levelReq[level];
      spCost = skill.sp[level];
    }

    return {
      levelReq,
      parents,
      spCost,
    };
  },

  description(state, getters, State, Getters) {
    const skill = getters.skill;
    const messages = Getters.messages;

    const level = Math.max(1, getters.level);
    const index = Level.indexOf(level);
    const descriptionId = skill.description[state.mode][index];

    const str = messages[descriptionId];
    const params = skill.params[state.mode][index];

    return parameterize(str, params, messages);
  },

  nextDescription(state, getters, State, Getters) {
    const skill = getters.skill;
    const messages = Getters.messages;
    const level = getters.level;

    if (level > 0 && level < skill.maxLevel) {
      const descriptionId = skill.description[state.mode][level];
      const str = messages[descriptionId];
      const params = skill.params[state.mode][level];

      return parameterize(str, params, messages);
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

  setLevel({ commit, rootState }, { skillId, level }) {
    const skill = rootState.job.skills[skillId];
    const index = skill.index;

    commit(types.SET_SKILL_LEVEL, { index, level });
    commit(types.SET_ACTIVE, skillId);
  },

  setMode({ commit }, mode) {
    commit(types.SET_MODE, mode);
  },

  toggleGearTech({ commit, state, getters }, { skillId, tech }) {
    const techs = state.techs;
    const index = techs.indexOf(skillId);

    if (index !== -1) {
      commit(types.REMOVE_GEAR_TECH, index);
    }

    switch (tech) {
      default:
        throw Error(`Invalid tech option: ${tech}`);
      case 1:
        if (index !== 0) {
          commit(types.SET_GEAR_TECH, { skillId, techIndex: 0 });
        }
        break;
      case 8:
        if (index !== 1) {
          commit(types.SET_GEAR_TECH, { skillId, techIndex: 1 });
        }
        break;
      case 9:
        if (index !== 2) {
          commit(types.SET_GEAR_TECH, { skillId, techIndex: 2 });
        }
        break;
      case 10:
        if (index === 3) {
          commit(types.SET_GEAR_TECH, { skillId: techs[4], techIndex: 3 });
          commit(types.SET_GEAR_TECH, { skillId: -1, techIndex: 4 });
          break;
        } else if (index === 4) {
          break;
        }

        if (techs[3] === -1) {
          commit(types.SET_GEAR_TECH, { skillId, techIndex: 3 });
        } else if (techs[4] === -1) {
          commit(types.SET_GEAR_TECH, { skillId, techIndex: 4 });
        } else { // slide it over
          commit(types.SET_GEAR_TECH, { skillId: techs[4], techIndex: 3 });
          commit(types.SET_GEAR_TECH, { skillId, techIndex: 4 });
        }
        break;
    }
  },

  toggleCrestTech({ commit, state }, skillId) {
    if (state.crestTech === skillId) {
      commit(types.REMOVE_CREST_TECH);
    } else {
      commit(types.SET_CREST_TECH, skillId);
    }
  },
};

const mutations = {
  [types.SET_ASCENDANCY](state, ascendancy) {
    state.ascendancy = ascendancy;
  },

  [types.SOFT_RESET](state) {
    const reset = initialState();
    Object.keys(reset).forEach(key => Vue.set(state, key, reset[key]));
  },

  [types.SET_TITLE](state, title) {
    state.title = title;
  },

  [types.SET_ACTIVE](state, skillId) {
    state.active = skillId;
  },

  [types.SET_SKILL_LEVEL](state, { index, level }) {
    Vue.set(state.levels, index, Level.indexOf(level));
  },

  [types.SET_MODE](state, mode) {
    state.mode = mode;
  },

  [types.SET_GEAR_TECH](state, { skillId, techIndex }) {
    Vue.set(state.techs, techIndex, skillId);
  },

  [types.REMOVE_GEAR_TECH](state, techIndex) {
    Vue.set(state.techs, techIndex, -1);
  },

  [types.SET_CREST_TECH](state, skillId) {
    state.crestTech = skillId;
  },

  [types.REMOVE_CREST_TECH](state) {
    state.crestTech = -1;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
