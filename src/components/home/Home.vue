<template>
  <div class="container">
    <Navigation />

    <div class="row jobsRow" v-for="row in jobPartitions">
      <div class="col-md-3" v-for="group in row">
        <div class="jobGroup" v-for="job in group">
          <Job :name="job.name" :icon="job.icon" :slug="job.slug" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Job from './Job';
  import Navigation from '../Navigation';

  export default {
    created() {
      this.$store.dispatch('loadJobs');
    },
    computed: {
      ...mapState({
        jobs: 'jobs',
      }),
      jobPartitions() {
        const list = this.jobs.list;
        const rows = [];
        const groupings = 4;

        for (let i = 0; i < list.length; i += groupings) {
          rows.push(list.slice(i, i + groupings));
        }

        return rows;
      },
    },
    components: {
      Job,
      Navigation,
    },
  };
</script>

<style>
  .jobsRow {
    margin-top: 30px;
    margin-bottom: 40px;
  }

  .jobsRow:last-of-type {
    margin-bottom: 0;
  }
</style>
