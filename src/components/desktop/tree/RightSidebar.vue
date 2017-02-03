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

<style>
  .description .card-header {
    background: #02151D;
    color: #fff;
  }

  .description .nav-link {
    color: #FFF;
  }

  .description .nav-item {
    width: 50%;
  }

  .description .nav-item a {
    border: 0;
  }

  .alternative-skills {
    margin-bottom: 10px;
  }
</style>
