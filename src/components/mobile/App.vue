<template>
  <div class="container">
    <Navigation/>

    <router-view></router-view>
  </div>
</template>

<script>
  import Navigation from '../common/Navigation';

  export default {
    watch: {
      title(newTitle) {
        document.title = newTitle;
      },
    },

    computed: {
      title() {
        return this.$store.state.title;
      },
    },

    components: {
      Navigation,
    },
  };
</script>
