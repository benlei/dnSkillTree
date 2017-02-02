<template>
  <div class="tree-app" v-if="job.loaded">
    {{ title }}
    <div class="row">
      <div class="col-lg-12">
        <div class="alert alert-success" role="alert">
          <strong>Well done!</strong> You successfully read this important alert message.
        </div>
      </div>
    </div>

    <div class="row">
      <LeftSidebar />

      <div class="col-lg-4">
        <table class="tree" :style="treeStyle">
          <tr v-for="(_, row) in 6">
            <td v-for="(_, col) in 4">
              <Skill :id="skillId(build.ascendancy, row, col)"/>
            </td>
          </tr>
        </table>
      </div>

      <RightSidebar/>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import Skill from './Skill';
  import LeftSidebar from './LeftSidebar';
  import RightSidebar from './RightSidebar';

  export default {
    created() {
      this.$store.dispatch('softReset');
      this.$store.dispatch('loadJob', this.$route.params.slug);
    },
    computed: {
      ...mapState([
        'job',
        'build',
      ]),
      ...mapGetters([
        'jobName',
      ]),
      title() {
        this.$store.dispatch('setTitle', this.jobName);
      },
      treeStyle() {
        const slug = this.job.ascendancies[this.build.ascendancy].slug;
        return {
          background: `url(${process.env.ASSETS_URL}/images/${slug}.png)`,
        };
      },
    },
    methods: {
      skillId(ascendancy, row, col) {
        return this.job.tree[ascendancy][(row * 4) + col];
      },
    },
    components: {
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
    background-repeat: no-repeat !important;
    background-position: -4px 7px !important;
    background-size: 323px 543px !important;
  }
</style>
