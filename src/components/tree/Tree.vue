<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="container" v-if="job.loaded">
    <Navigation :name="jobName"/>


    <div class="row">
      <LeftSidebar />

      <div class="col-md-4">
        <table class="tree">
          <tr v-for="(_, row) in 6">
            <td v-for="(_, col) in 4">
              <Skill :id="skillId(build.ascendancy, row, col)"/>
            </td>
          </tr>
        </table>
      </div>

      <RightSidebar/>
    </div>

    <div class="row clearfix">
      <div class="col-md-12">
        <div class="alert alert-warning" role="alert">
          <strong>Warning!</strong> Better check yourself, you're not looking too good.
        </div>
        <div class="alert alert-warning" role="alert">
          <strong>Warning!</strong> Better check yourself, you're not looking too good.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import Navigation from '../Navigation';
  import Skill from './Skill';
  import LeftSidebar from './LeftSidebar';
  import RightSidebar from './RightSidebar';

  export default {
    created() {
      this.$store.dispatch('softReset');
      this.$store.dispatch('loadJob', this.$route.params.slug);
    },
    computed: {
      ...mapState({
        job: 'job',
        build: 'build',
      }),
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
      LeftSidebar,
      RightSidebar,
    },
  };
</script>

<style>

  .tree {
    margin-left: auto;
    margin-right: auto;
  }
</style>
