<template>
  <div class="container">
    <div class="col-md-12 jobs-row" v-for="row in jobPartitions">
      <div class="container col-md-3" v-for="group in row">
        <div v-for="job in group">
          {{ job.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

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
    methods: {
    },
  };
</script>

<style>
  body {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .jobs-row {
    padding-bottom: 20px;
  }

  .jumbotron p:last-child {
    margin-bottom: 0;
  }

  .jumbotron-heading {
    font-weight: 300;
  }

  .jumbotron .container {
    max-width: 40rem;
  }

</style>
