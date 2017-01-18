import Axios from 'axios';
import * as types from '../mutation-types';

const state = {
  crests: {},
  jobs: {},
  messages: {},
  skills: {},
  slug: null,
  tree: [],
  weapons: {},
};

const getters = {
};

const actions = {
  loadTree({ commit }, slug) {
    const url = `${process.env.ASSETS_URL}/ext/${slug}.json`;

    Axios.get(url)
      .then(response => response.data)
      .then(skilltree => commit(types.SAVE_SKILLTREE, { skilltree }));
  },
};

const mutations = {
  [types.SAVE_SKILLTREE]($state, { skilltree }) {
    state.crests = { ...state.crests, ...skilltree.crests };
    state.jobs = { ...state.jobs, ...skilltree.jobs };
    state.messages = { ...state.messages, ...skilltree.messages };
    state.skills = { ...state.skills, ...skilltree.skills };
    state.weapons = { ...state.weapons, ...skilltree.weapons };
    state.tree = [...state.tree, ...skilltree.tree];
    state.slug = skilltree.slug;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

