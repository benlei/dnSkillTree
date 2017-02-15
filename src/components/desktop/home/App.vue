<template>
  <div class="home-app container" :class="{ loading: !jobs.loaded }">
    <template v-if="jobs.loaded">
      <div class="row jobsRow" v-for="partitions in jobPartitions">
        <div class="col-lg-3" v-for="group in partitions">
          <div class="row" v-for="row in group">
            <div class="col-lg-6" v-for="job in row">
              <Job :name="job.name" :icon="job.icon" :slug="job.slug"/>
            </div>
          </div>
        </div>
      </div>
    </template>
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
        const cols = 2;
        const colsList = [];

        list.forEach((group, index) => {
          colsList[index] = [];
          for (let i = 0; i < group.length; i += cols) {
            colsList[index].push(group.slice(i, i + cols));
          }
        });

        for (let i = 0; i < colsList.length; i += groupings) {
          rows.push(colsList.slice(i, i + groupings));
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

  .loading {
    background: url(~/static/loading.gif) no-repeat center;
    height: 300px;
  }
</style>
