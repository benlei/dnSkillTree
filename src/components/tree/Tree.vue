<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="container" v-if="job.loaded">
    <Navigation :name="jobName" />

    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <ul class="list-group list-group-flush">
            <li class="list-group-item justify-content-between active" v-on:click="ascendancy = 0">
              Warrior
              <small>14 / 120</small>
            </li>
            <li class="list-group-item justify-content-between" v-on:click="ascendancy = 1">
              Swordsman
              <small>2 / 140</small>
            </li>
            <li class="list-group-item justify-content-between" v-on:click="ascendancy = 2">
              Gladiator
              <small>1 / 144</small>
            </li>
            <li class="list-group-item justify-content-between" v-on:click="ascendancy = 3">
              Awakened
            </li>
          </ul>
          <div class="card-footer text-muted justify-content-between">
            Total SP
            <small>149 / 199</small>
          </div>
        </div>
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
.card-footer {
  border-top: 0;
}
  .card-footer small {
    float: right;
  }
</style>
