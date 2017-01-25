<template>
  <div class="container">
    <Navigation/>

    <div class="row">
      <div class="col-md-4">
        Hello, {{ $route.params.slug }}! This is for the selector and stuff.
      </div>
      <div class="col-md-4">
        <table class="tree">
          <tr v-for="row in 6">
            <td v-for="col in 4">
              <Skill :id="getSkillId(row, col)" />
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
  import { mapState } from 'vuex';
  import Navigation from '../Navigation';
  import Skill from './Skill';

  export default {
    created() {
      this.$store.dispatch('loadJob', this.$route.params.slug);
    },
    computed: {
      ...mapState({ job: 'job' }),
      getSkillId(row, col) {
        row -= 1;
        col -= 1;
        return this.job.tree[(row * 4) + col];
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
