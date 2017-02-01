<template>
  <div class="container">
    <Navigation />

    <router-view></router-view>

    <hr />

    <footer>
      <ol class="breadcrumb">
        <li class="breadcrumb-item active">NA</li>
        <li class="breadcrumb-item"><a href="#">SEA</a></li>
      </ol>
    </footer>
  </div>
</template>

<script>
  import Navigation from './Navigation';

  export default {
    components: {
      Navigation,
    },
  };
</script>

<style scoped>
  .breadcrumb {
    background: transparent;
  }

  .breadcrumb-item.active {
    color: #000;
  }
</style>

<style>
  body {
    padding-top: 10px;
    padding-bottom: 20px;
  }

  a:hover, a:link, a:visited {
    text-decoration: none;
  }
</style>
