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

  a:hover, a:link, a:visited {
    text-decoration: none;
  }
</style>
