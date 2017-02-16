<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-2 text-center" v-for="(ascendancy, i) in job.ascendancies">
        <a href="javascript:;" @click.prevent="setAscendancy(i)">
          <div class="mx-auto" :style="getJobImageStyle(ascendancy.icon)"/>
        </a>
        <small>
          {{ spTotals[i] }} / {{ ascendancy.sp }}
        </small>
        <small v-if="ascendancyTechs[i]">
          + {{ ascendancyTechs[i] }}
        </small>
      </div>
      <div class="col-2" v-if="job.tree.length === 4">
        <a href="javascript:;" @click.prevent="setAscendancy(3)">
          <div class="mx-auto grayscale" :style="getJobImageStyle(job.ascendancies[2].icon)"/>
        </a>
      </div>
      <div class="col-2 text-center text-gray">
        <div class="mx-auto total-sp"><i class="fa fa-circle-thin" /></div>
        <small>{{ spTotal }} / {{ job.sp }}</small>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapState([
        'job',
        'build',
      ]),

      ...mapGetters([
        'spTotals',
        'spTotal',
        'ascendancyTechs',
      ]),

      progressPercent() {
        const spTotal = this.spTotal;
        const maxSp = this.job.sp;

        return (spTotal / maxSp) * 100;
      },
    },

    methods: {
      ...mapActions([
        'setAscendancy',
      ]),
    },
  };
</script>

<style>
  .total-sp {
    width: 55px;
  }

  .total-sp {
    width: 55px;
    height: 55px;
    font-size: 40px;
  }

  .text-gray {
    color: #999;
  }
</style>
