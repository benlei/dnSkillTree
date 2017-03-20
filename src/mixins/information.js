import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'active',
      'level',
      'skill',
      'name',
      'meta',
      'techCount',
      'spTotal',
      'spTotals',
    ]),
  },

  methods: {
    ...mapActions(['setMode']),
  },
};
