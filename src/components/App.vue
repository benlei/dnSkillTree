<template>
  <div>
    <Navigation/>

    <div class="container">

      <router-view></router-view>

      <F00ter/>
    </div>
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
