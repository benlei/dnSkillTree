import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState([
      'job',
      'build',
    ]),

    ...mapGetters([
      'active',
      'activeAlt',
      'level',
      'messages',
      'skill',
      'name',
      'meta',
      'techCount',
      'type',
      'attribute',
      'weapons',
      'next',
      'description',
      'nextDescription',
      'altSkills',
      'spTotals',
      'spTotal',
      'softMaxLevel',
    ]),

    ascendancyReqs() {
      const spTotals = this.spTotals;
      const skill = this.skill;
      const reqs = [];

      skill.ascendancies.forEach((sp, ascendancy) => {
        if (spTotals[ascendancy] < sp) {
          reqs.push({ ascendancy, sp });
        }
      });

      return reqs;
    },

    lackSp() {
      const spTotals = this.spTotals;
      const spTotal = this.spTotal;
      const job = this.skill.job;
      const next = this.next;
      const ascendancies = this.job.ascendancies;
      const maxSp = this.job.sp;

      return spTotals[job] + next.spCost > ascendancies[job].sp
        || spTotal + next.spCost > maxSp;
    },

    showLevelUpReq() {
      const { next, ascendancyReqs } = this;
      const parents = next.parents ? next.parents.length : 0;

      if (this.level < this.skill.maxLevel) {
        return next.levelReq || parents || ascendancyReqs.length || next.spCost;
      }

      return parents || ascendancyReqs.length;
    },
  },

  methods: {
    ...mapActions([
      'setMode',
      'setActiveAlt',
    ]),
  },
};
