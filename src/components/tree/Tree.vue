<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="container" v-if="job.loaded">
    <Navigation :name="jobName" />

    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <ul class="list-group list-group-flush">
            <li class="list-group-item justify-content-between"
                :class="{active: ascendancyIndex == i}"
                v-for="(ascendancy, i) in job.ascendancies"
                v-on:click="ascendancyIndex = i">
              {{ ascendancy.name }}
              <small>0 / {{ ascendancy.sp }}</small>
            </li>
            <li class="list-group-item justify-content-between"
                :class="{active: ascendancyIndex == 3}"
                v-on:click="ascendancyIndex = 3"
                v-if="job.tree.length == 4">
              Awakened
            </li>
          </ul>
          <div class="card-footer text-muted justify-content-between">
            Total SP
            <small>0 / {{ job.sp }}</small>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <table class="tree">
          <tr v-for="(_, row) in 6">
            <td v-for="(_, col) in 4">
              <Skill :id="skillId(ascendancyIndex, row, col)" />
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
        ascendancyIndex: 0,
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
      skillId(ascendancy, row, col) {
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
