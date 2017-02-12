<template>
  <div class="home-app container">
    <div class="row jobsRow" v-for="row in jobPartitions">
      <div class="col-lg-3" v-for="group in row">
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

  export default {
    created() {
      this.$store.dispatch('loadJobs');
      this.$store.dispatch('reset');
      this.$store.dispatch('setTitle', 'MAZE');
    },

    computed: {
      ...mapState([
        'jobs',
        'build',
      ]),

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
