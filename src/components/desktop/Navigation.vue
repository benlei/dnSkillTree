<template>
  <div class="breadcrumb">
    <div class="d-flex justify-content-between">
      <div class="nav-tree">
        <template v-if="build.title === 'MAZE'">
          <span class="breadcrumb-item active">MAZE</span>
        </template>
        <template v-else>
          <router-link to="/" class="breadcrumb-item">MAZE</router-link>
          <span class="breadcrumb-item active">{{ build.title }}</span>
        </template>
      </div>

      <div class="nav-region">
        <a class="breadcrumb-item" href="#">Mobile</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState([
        'build',
      ]),
    },
  };
</script>

<style scoped>
  .breadcrumb {
    background: #02151D;
    color: #FFF;
  }

  .breadcrumb a {
    color: #FBB200;
  }

  .breadcrumb .active {
    color: #FFF;
  }
</style>
