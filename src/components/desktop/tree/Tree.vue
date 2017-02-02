<template>
  <div class="col-lg-4">
    <table class="tree" :style="build.ascendancy < 3 && treeStyle">
      <tr v-for="(_, row) in 6">
        <td v-for="(_, col) in 4">
          <Skill :id="skillId(build.ascendancy, row, col)"/>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Skill from './Skill';

  export default {
    computed: {
      ...mapState([
        'job',
        'build',
      ]),
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
    },
  };
</script>
