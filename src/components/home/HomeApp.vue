<template>
  <div class="container">
    <div class="col-md-12 jobsRow" v-for="row in jobPartitions">
      <div class="container col-md-3" v-for="group in row">
        <div v-for="job in group">
          <Job :name="job.name" :icon="job.icon" :slug="job.slug" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Job from './Job';

  export default {
    created() {
      this.$store.dispatch('loadJobs');
    },
    computed: {
      ...mapGetters({
        jobs: 'jobList',
      }),
      jobPartitions() {
        const jobs = this.jobs;
        const rows = [];

        for (let i = 0; i < jobs.length; i += 4) {
          rows.push(jobs.slice(i, i + 4));
        }

        return rows;
      },
    },
    components: {
      Job,
    },
  };
</script>

<style>
  body {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .jobsRow {
    margin-bottom: 40px;
  }

  .jobsRow:last-of-type {
    margin-bottom: 0;
  }
</style>
