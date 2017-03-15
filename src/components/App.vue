<template>
  <div>
    <Navigation/>

    <div class="container">
      <div class="alert alert-info" v-if="!isLatest">
        The latest version for this region is located here:
        <strong>
          <a :href="`/${latestVersion}/${latestBuild}`">
            /{{ latestVersion }}/{{ latestBuild }}
          </a>
        </strong>
      </div>

      <router-view></router-view>

      <F00ter/>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios';
  import Navigation from './Navigation';
  import F00ter from './Footer';

  export default {
    created() {
      let url = process.env.VERSION_URL;
      url = url.replace('http:', window.location.protocol);

      Axios.get(url)
        .then(response => response.data)
        .then((data) => {
          this.latestVersion = data.version;
          this.latestBuild = data.build;
        });
    },

    data() {
      return {
        version: process.env.VERSION,
        latestVersion: process.env.VERSION,
        build: process.env.BUILD_VERSION,
        latestBuild: process.env.BUILD_VERSION,
      };
    },

    watch: {
      title(newTitle) {
        document.title = newTitle;
      },
    },

    computed: {
      title() {
        return this.$store.state.title;
      },

      isLatest() {
        return this.build === this.latestBuild && this.version === this.latestVersion;
      },
    },

    components: {
      Navigation,
      F00ter,
    },
  };
</script>

<style>
  html {
    overflow-x: hidden;
  }

  body {
    padding-bottom: 20px;
    width: calc(100vw);
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
