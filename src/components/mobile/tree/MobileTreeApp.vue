<template>
  <div :class="{ loading: !job.loaded }">
    <template v-if="job.loaded">
      <BuildInput :cols="['col-sm-10', 'col-sm-2']"/>

      <div class="progress">
        <div class="progress-bar bg-info" style="width: 50%"/>
      </div>

      <Tree />
    </template>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import BuildInput from '../../common/BuildInput';
  import Tree from './Tree';

  export default {
    created() {
      const { slug, path } = this.$route.params;
      this.$store.dispatch('loadJob', {
        slug,
        path,
      });
    },

    computed: {
      ...mapState([
        'job',
      ]),

      ...mapGetters([
        'active',
        'jobName',
      ]),
    },

    components: {
      BuildInput,
      Tree,
    },
  };
</script>
