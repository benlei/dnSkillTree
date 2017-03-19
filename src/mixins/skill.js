import { mapState, mapGetters, mapActions } from 'vuex';
import Level from '../lib/level';

export default {
  props: ['id'],

  computed: {
    ...mapState([
      'job',
      'build',
    ]),

    ...mapGetters([
      'active',
      'index',
      'softMaxLevel',
    ]),

    skill() {
      return this.job.skills[this.id];
    },

    skillImageStyle() {
      const skill = this.skill;
      return this.getSkillIconStyle(skill, this.level);
    },

    softMaxLevel() {
      return this.skill.maxLevel - this.skill.spMaxLevel;
    },

    level() {
      const indexes = this.build.indexes;
      const skill = this.job.skills[this.id];
      return Level.valueOf(indexes, skill);
    },

    techCount() {
      let count = 0;

      if (this.build.crestTech === this.id) {
        count += 1;
      }

      if (this.build.techs.indexOf(this.id) !== -1) {
        count += 1;
      }

      return Math.min(this.skill.spMaxLevel, count);
    },

    crested() {
      const crest = this.build.crests[this.id];
      return crest >= 0;
    },

    relatedRecently() {
      return this.build.related[this.id] === 1;
    },
  },
  methods: {
    ...mapActions([
      'setActive',
      'setLevel',
    ]),
  },
};
