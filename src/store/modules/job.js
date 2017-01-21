import * as types from '../mutation-types';

const state = {
  ascendancy: [],
  tree: [],
  messages: {},
  crests: {},
  skills: {},
  weapons: {},
};

const actions = {
};

const mutations = {
  [types.INIT_JOB](state, { ascendancy, tree, messages, crests, skills, weapons }) {
    state.ascendancy = ascendancy;
    state.tree = tree;
    state.messages = messages;
    state.crests = crests;
    state.skills = skills;
    state.weapons = weapons;
  },
};

export default {
  state,
  actions,
  mutations,
};
