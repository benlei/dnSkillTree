import * as types from '../mutation-types';

const state = {
  ascendancies: [],
  tree: [],
  messages: {},
  crests: {},
  skills: {},
  weapons: {},
  sp: 0,
  loaded: false,
};

const getters = {
  jobName(state) {
    return state.ascendancies[2].name;
  },
};

const mutations = {
  [types.INIT_JOB](state, { ascendancies, tree, messages, crests, skills, weapons, sp }) {
    state.ascendancies = ascendancies;
    state.tree = tree;
    state.messages = messages;
    state.crests = crests;
    state.skills = skills;
    state.weapons = weapons;
    state.sp = sp;

    state.loaded = true;
  },
};

export default {
  state,
  getters,
  mutations,
};
