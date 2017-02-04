<template>
  <div class="col-lg-4">
    <template v-if="active !== -1">
      <Information />

      <RelatedSkills />
    </template>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import Information from './Information';
  import RelatedSkills from './RelatedSkills';

  export default {
    computed: {
      ...mapState([
        'job',
        'build',
      ]),
      ...mapGetters([
        'active',
      ]),
    },
    components: {
      Information,
      RelatedSkills,
    },
  };
</script>
