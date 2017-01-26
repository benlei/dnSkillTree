import * as types from '../mutation-types';

const state = {
  ascendancy: [],
  tree: [],
  messages: {},
  crests: {},
  skills: {},
  weapons: {},
  loaded: false,
};

const getters = {
  jobName(state) {
    return state.ascendancy[2].name;
  },
};

const mutations = {
  [types.INIT_JOB](state, { jobs, tree, messages, crests, skills, weapons }) {
    state.ascendancy = jobs;
    state.tree = tree;
    state.messages = messages;
    state.crests = crests;
    state.skills = skills;
    state.weapons = weapons;

    state.loaded = true;
  },
};

export default {
  state,
  getters,
  mutations,
};
