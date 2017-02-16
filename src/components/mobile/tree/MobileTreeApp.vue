<template>
  <div :class="{ loading: !job.loaded }">
    <template v-if="job.loaded">
      <BuildInput :cols="['col-10', 'col-2']"/>
      <Ascendancies />
      <Tree />
    </template>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import BuildInput from '../../common/BuildInput';
  import Ascendancies from './Ascendancies';
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
      Ascendancies,
    },
  };
</script>
