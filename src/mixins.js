import Vue from 'vue';

Vue.mixin({
  methods: {
    isMobile() {
      return this.$route.name.startsWith('mobile');
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

    toTop() {
      window.scrollTo(0, 0);
    },
  },
});
