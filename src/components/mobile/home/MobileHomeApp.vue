<template>
  <div class="home-app container" :class="{ loading: !jobs.loaded }">
    <template v-if="jobs.loaded">
      <div class="row jobsRow mobile" v-for="group in jobs.list">
        <div class="col-sm-2 col-2" v-for="job in group">
          <Job :icon="job.icon" :to="'/m/' + job.slug"/>
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

//      jobPartitions() {
//        const list = this.jobs.list;
//        const rows = [];
//        const groupings = 4;
//        const cols = 2;
//        const colsList = [];
//
//        list.forEach((group, index) => {
//          colsList[index] = [];
//          for (let i = 0; i < group.length; i += cols) {
//            colsList[index].push(group.slice(i, i + cols));
//          }
//        });
//
//        for (let i = 0; i < colsList.length; i += groupings) {
//          rows.push(colsList.slice(i, i + groupings));
//        }
//
//        return rows;
//      },
    },

    components: {
      Job,
    },
  };
</script>

<style>
  .mobile.jobsRow {

  }
</style>
