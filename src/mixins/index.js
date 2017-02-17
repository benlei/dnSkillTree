import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

Vue.mixin({
  computed: {
    ...mapState([
      'job',
      'build',
    ]),
  },

  methods: {
    ...mapActions([
      'setAscendancy',
      'activateRelated',
      'deactivateRelated',
    ]),

    isMobile() {
      return this.$route.name.startsWith('mobile');
    },

    toTop() {
      window.scrollTo(0, 0);
    },

    getJobImageStyle(icon) {
      const scale = 55;
      const xPos = (icon % 9) * scale;
      const yPos = Math.floor(icon / 9) * scale;

      return {
        backgroundImage: `url(${process.env.ASSETS_URL}/images/jobicon_main.png)`,
        height: `${scale}px`,
        width: `${scale}px`,
        backgroundPosition: `-${xPos}px -${yPos}px`,
      };
    },

    getSkillIconStyle(skill, level) {
      const icon = Math.floor(skill.icon / 200) + 1;
      const sprite = icon < 10 ? `0${icon}` : icon;
      const row = Math.floor((skill.icon % 200) / 10);
      const col = skill.icon % 10;
      const suffix = level ? '' : '_b';

      return {
        backgroundImage: `url(${process.env.ASSETS_URL}/images/skillicon${sprite}${suffix}.png)`,
        backgroundPosition: `-${col * 50}px -${row * 50}px`,
      };
    },

    jumpToSkill(skill) {
      this.setAscendancy(skill.jobIndex);
      this.activateRelated(skill.id);

      // setTimeout(() => thiz.deactivateRelated(skill.id), 3000);
    },
  },

  filters: {
    join: (arr, separator) => arr.join(separator),
  },
});
