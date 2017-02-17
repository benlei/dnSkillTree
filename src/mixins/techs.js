import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState([
      'build',
    ]),

    ...mapGetters([
      'active',
      'skill',
    ]),
  },

  methods: {
    ...mapActions([
      'toggleGearTech',
      'toggleCrestTech',
    ]),

    isTeched(tech) {
      const techs = this.build.techs;
      const skillId = this.active;

      switch (tech) {
        default:
          throw new Error(`Unknown tech: ${tech}`);
        case 0:
          return this.build.crestTech === skillId;
        case 1:
          return techs[0] === skillId;
        case 8:
          return techs[1] === skillId;
        case 9:
          return techs[2] === skillId;
        case 10:
          return techs[3] === skillId || techs[4] === skillId;

      }
    },

    gearTech(tech) {
      this.toggleGearTech({ skillId: this.active, tech });
    },

    crestTech() {
      this.toggleCrestTech(this.active);
    },
  },

  filters: {
    techName(num) {
      switch (num) {
        default:
          return 'Crest';
        case 1:
          return 'Weapon';
        case 8:
          return 'Necklace';
        case 9:
          return 'Earring';
        case 10:
          return 'Ring';
      }
    },
  },
};
