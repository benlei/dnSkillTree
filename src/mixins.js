import Vue from 'vue';

Vue.mixin({
  methods: {
    isMobile() {
      return this.$route.name.startsWith('mobile');
    },
  },
});
