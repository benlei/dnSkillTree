<template>
  <div class="header clearfix">
    <nav class="breadcrumb">
      <div class="nav-region float-right">
        <a class="breadcrumb-item" href="#">SEA</a>
        <span class="breadcrumb-item active">NA</span>
      </div>

      <div class="nav-tree">
        <template v-if="!name">
          <span class="breadcrumb-item active">MAZE</span>
        </template>
        <template v-else="name">
          <router-link to="/" class="breadcrumb-item">MAZE</router-link>
          <span class="breadcrumb-item active">{{ name }}</span>
        </template>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    props: ['name'],
  };
</script>

<style>
  body {
    padding-top: 10px;
    padding-bottom: 20px;
  }

  .breadcrumb {
    background: #02151D;
    color: #FFF;
  }

  .breadcrumb a {
    color: #FBB200;
  }

  .breadcrumb a:hover {
    text-decoration: none;
  }

  .breadcrumb .active {
    color: #FFF;
  }
</style>
