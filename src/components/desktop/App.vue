<template>
  <div class="container">
    <Navigation />

    <router-view></router-view>

    <F00ter />
  </div>
</template>

<script>
  import Navigation from './Navigation';
  import F00ter from './Footer';

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
      F00ter,
    },
  };
</script>

<style>
  body {
    padding-top: 10px;
    padding-bottom: 20px;
  }

  a, a:link, a:visited {
    color: #FBB200;
    text-decoration: none;
  }

  a:hover {
    color: #cb9000;
    text-decoration: none;
  }
</style>
