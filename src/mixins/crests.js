import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState([
      'build',
    ]),

    ...mapGetters([
      'active',
      'skill',
      'crests',
      'crest',
      'crestCount',
    ]),
  },

  methods: {
    ...mapActions([
      'setSkillCrest',
      'removeSkillCrest',
    ]),

    setCrest(index) {
      if (index === -1) {
        this.removeSkillCrest(this.active);
      } else {
        this.setSkillCrest({ skillId: this.active, index });
      }
    },
  },
};
