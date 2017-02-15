<template>
  <div class="container">
    <Navigation />

    <router-view></router-view>

    <F00ter />
  </div>
</template>

<script>
  import Navigation from '../common/Navigation';
  import F00ter from '../common/Footer';

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
    color: #107d9b;
    text-decoration: none;
  }

  a:hover {
    color: #15a1cb;
    text-decoration: none;
  }
</style>
