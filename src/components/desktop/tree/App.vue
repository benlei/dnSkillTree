<template>
  <div class="tree-app" v-if="job.loaded">
    {{ title }}

    <Alert/>

    <div class="row">
      <LeftSidebar/>

      <Tree/>

      <RightSidebar/>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import Alert from './Alert';
  import LeftSidebar from './LeftSidebar';
  import Tree from './Tree';
  import RightSidebar from './RightSidebar';

  export default {
    created() {
      this.$store.dispatch('loadJob', this.$route.params.slug);
    },

    computed: {
      ...mapState([
        'job',
      ]),

      ...mapGetters([
        'jobName',
      ]),

      title() {
        this.$store.dispatch('setTitle', this.jobName);
      },
    },

    components: {
      Alert,
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
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
  }

  .card .list-group .list-group-item:first-child {
    border-top: 0;
  }
</style>
