<template>
  <div>
    <table class="mobile-tree mx-auto" :style="build.ascendancy < 3 && treeStyle">
      <tr v-for="(_, row) in 6">
        <td v-for="(_, col) in 4">
          <Skill :id="skillId(build.ascendancy, row, col)" :toggle="toggleInfoModal" />
        </td>
      </tr>
    </table>

    <InformationModal :toggle="toggleInfoModal" :display="infoModal" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Skill from './Skill';
  import InformationModal from './InformationModal';

  export default {
    data() {
      return {
        infoModal: false,
      };
    },

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

      toggleInfoModal() {
        this.infoModal = !this.infoModal;
      },
    },

    components: {
      Skill,
      InformationModal,
    },
  };
</script>

<style>
  .mobile-tree {
    margin-top: .5rem;
    background-repeat: no-repeat !important;
    background-size: 512px 512px !important;
    background-position-y: 1px !important;
  }
</style>
