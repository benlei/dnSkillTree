<template>
  <div class="card ascendancies">
    <ul class="list-group list-group-flush">
      <li class="list-group-item justify-content-between ascendancy"
          :class="{active: build.ascendancy == i}"
          @click="setAscendancy(i)"
          v-for="(ascendancy, i) in job.ascendancies">
        {{ ascendancy.name }}
        <small>{{ spTotals[i] || 0 }}{{ ascendancyTechs[i] ? ' +' + ascendancyTechs[i] : ''}} / {{ ascendancy.sp }}</small>
      </li>
      <li class="list-group-item ascendancy"
          :class="{active: build.ascendancy == 3}"
          @click="setAscendancy(3)"
          v-if="job.tree.length == 4">
        Awakened
      </li>
    </ul>
    <div class="card-footer d-flex text-muted justify-content-between disabled">
      Total SP
      <small>{{ spTotal }} / {{ job.sp }}</small>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapState([
        'build',
        'job',
      ]),

      ...mapGetters([
        'spTotals',
        'ascendancyTechs',
      ]),

      spTotal() {
        const spTotals = this.spTotals;
        let spTotal = 0;

        for (let i = 0; i < spTotals.length; i += 1) {
          spTotal += spTotals[i];
        }

        return spTotal;
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
  .ascendancies .card-footer {
    border-top: 0;
    font-size: 80%;
  }

  .ascendancies .card-footer small {
    float: right;
  }

  .card .ascendancy.active {
    background: #FBB200;
  }
</style>
