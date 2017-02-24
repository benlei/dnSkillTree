<template>
  <div class="home-app container" :class="{ loading: !jobs.loaded }">
    <template v-if="jobs.loaded">
      <div class="row jobsRow mobile" v-for="group in jobs.list">
        <div class="col-sm-2 col-2" v-for="job in group">
          <Job :icon="job.icon" :to="'/m/' + job.slug" :awakened="job.awakened" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Job from '../../common/Job';

  export default {
    created() {
      this.$store.dispatch('loadJobs');
      this.$store.dispatch('reset');
      this.$store.dispatch('setTitle', 'MAZE');
    },

    computed: {
      ...mapState([
        'jobs',
      ]),
    },

    components: {
      Job,
    },
  };
</script>

<style>
  .mobile.jobsRow {
    margin-bottom: 1rem;
  }
</style>
