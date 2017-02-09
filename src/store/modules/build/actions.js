import * as types from '../../mutation-types';

export default {
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

  setActive({ commit, getters }, skillId) {
    if (skillId !== getters.active) {
      commit(types.SET_ACTIVE, skillId);
      commit(types.SET_ACTIVE_ALT, -1);
    }
  },

  setActiveAlt({ commit }, skillId) {
    commit(types.SET_ACTIVE_ALT, skillId);
  },

  setLevel({ commit, rootState }, { skillId, level }) {
    const skill = rootState.job.skills[skillId];
    const index = skill.index;

    if (level > skill.maxLevel) {
      return;
    }

    commit(types.SET_SKILL_LEVEL, { index, level });
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
          commit(types.SET_GEAR_TECH, { skillId, tech: 0 });
        }
        break;
      case 8:
        if (index !== 1) {
          commit(types.SET_GEAR_TECH, { skillId, tech: 1 });
        }
        break;
      case 9:
        if (index !== 2) {
          commit(types.SET_GEAR_TECH, { skillId, tech: 2 });
        }
        break;
      case 10:
        if (index === 3) {
          commit(types.SET_GEAR_TECH, { skillId: techs[4], tech: 3 });
          commit(types.SET_GEAR_TECH, { skillId: -1, tech: 4 });
          break;
        } else if (index === 4) {
          break;
        }

        if (techs[3] === -1) {
          commit(types.SET_GEAR_TECH, { skillId, tech: 3 });
        } else if (techs[4] === -1) {
          commit(types.SET_GEAR_TECH, { skillId, tech: 4 });
        } else { // slide it over
          commit(types.SET_GEAR_TECH, { skillId: techs[4], tech: 3 });
          commit(types.SET_GEAR_TECH, { skillId, tech: 4 });
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

  setSkillCrest({ commit, getters }, { skillId, index }) {
    if (getters.crestCount < 7) {
      commit(types.SET_SKILL_CREST, { skillId, index });
    }
  },

  removeSkillCrest({ commit }, skillId) {
    commit(types.REMOVE_SKILL_CREST, skillId);
  },
};
