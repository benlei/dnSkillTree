<template>
  <nav class="d-flex justify-content-between">
    <ol class="breadcrumb nav-tree">
      <template v-if="build.title === 'MAZE'">
        <li class="breadcrumb-item">MAZE</li>
      </template>
      <template v-else>
        <li class="breadcrumb-item">
          <router-link to="/">MAZE</router-link>
        </li>
        <li class="breadcrumb-item">{{ build.title }}</li>
      </template>
    </ol>

    <ol class="breadcrumb info">
      <li class="breadcrumb-item">v{{ buildVersion }}</li>
      <li class="breadcrumb-item">Lv. {{ levelCap }}</li>
    </ol>
  </nav>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        levelCap: process.env.LEVEL_CAP,
        buildVersion: process.env.BUILD_VERSION,
      };
    },

    computed: {
      ...mapState([
        'build',
      ]),
    },
  };
</script>

<style scoped>
  nav {
    background: #02151D;
    color: #FFF;
    margin-bottom: 1rem;
    border-radius: .25rem;
  }

  .breadcrumb {
    background: transparent;
  }

  .breadcrumb .active {
    color: #FFF;
  }
</style>

<style>
  .breadcrumb {
    background: transparent;
    margin-bottom: 0;
  }
</style>
