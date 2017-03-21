<template>
  <div :class="{ loading: !job.loaded }">
    <template v-if="job.loaded">
      <BuildInput :cols="['col-md-11 col-10', 'col-md-1 col-2']"/>

      <div class="row">
        <LeftSidebar/>

        <Tree/>

        <RightSidebar/>
      </div>
    </template>
  </div>
</template>

<script>
  import LeftSidebar from './sidebar/LeftSidebar';
  import Tree from './Tree';
  import RightSidebar from './sidebar/RightSidebar';
  import BuildInput from '../common/BuildInput';

  export default {
    created() {
      const { slug, path } = this.$route.params;
      let loadedPath;

      // if a path is given, do not save it (could just be for viewing + pls no overwrite)
      // but if a change is made to this build, then there is an intention to save it
      if (path) {
//        this.$cookies.set(slug, path, Infinity, location.pathname, location.hostname);
        loadedPath = path;
      } else if (this.$cookies.isKey(slug)) {
        // if you have saved build, get it + load it up
        loadedPath = this.$cookies.get(slug);

        // this has to be done because path is empty, so update it to what cookie is
        this.updatePath(loadedPath);
      }

      this.$store.dispatch('loadJob', {
        slug,
        path: loadedPath,
      });
    },

    components: {
      BuildInput,
      LeftSidebar,
      Tree,
      RightSidebar,
    },
  };
</script>

<style>
  .fa, .unselectable {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
    /* Non-prefixed version, currently
                                     supported by Chrome and Opera */
  }

  .card .list-group .list-group-item:first-child {
    border-top: 0;
  }

  .fa {
    line-height: 1.5;
  }
</style>
