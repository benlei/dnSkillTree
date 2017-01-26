<template>
  <div class="container" v-if="job.loaded">
    <Navigation :name="jobName" />

    <div class="row">
      <div class="col-md-4">
        Hello, {{ $route.params.slug }}! This is for the selector and stuff.
      </div>
      <div class="col-md-4">
        <table class="tree">
          <tr v-for="row in 6">
            <td v-for="col in 4">
              <Skill :id="skillId({ ascendancy, row, col })" />
            </td>
          </tr>
        </table>
      </div>
      <div class="col-md-4">
        This is the description.
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import Navigation from '../Navigation';
  import Skill from './Skill';

  export default {
    data() {
      return {
        ascendancy: 0,
      };
    },
    created() {
      this.$store.dispatch('loadJob', this.$route.params.slug);
    },
    computed: {
      ...mapState({ job: 'job' }),
      ...mapGetters({
        jobName: 'jobName',
      }),
    },
    methods: {
      skillId({ ascendancy, row, col }) {
        row -= 1;
        col -= 1;
        return this.job.tree[ascendancy][(row * 4) + col];
      },
    },
    components: {
      Navigation,
      Skill,
    },
  };
</script>

<style>
  /*.skill-table {*/
    /*margin: 0 auto 15px auto;*/
    /*background-repeat: no-repeat;*/
    /*background-position: -5px -7px;*/
    /*background-size: 317px 510px;*/
  /*}*/

  /*.skill-table .skill-tr .skill-td {*/
    /*padding: 0 10px 28px 10px;*/
  /*}*/

  /*.skill {*/
    /*height: 50px;*/
    /*width: 50px;*/
  /*}*/
</style>
