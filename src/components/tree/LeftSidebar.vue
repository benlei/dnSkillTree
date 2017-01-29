<template>
  <div class="col-md-4">
    <div class="card ascendancies">
      <ul class="list-group list-group-flush">
        <li class="list-group-item justify-content-between"
            :class="{active: build.ascendancy == i}"
            v-for="(ascendancy, i) in job.ascendancies"
            v-on:click="build.ascendancy = i">
          {{ ascendancy.name }}
          <small>0 / {{ ascendancy.sp }}</small>
        </li>
        <li class="list-group-item justify-content-between"
            :class="{active: build.ascendancy == 3}"
            v-on:click="build.ascendancy = 3"
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
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        job: 'job',
        build: 'build',
      }),
    },
    methods: {
      changeAscendancy(ascendancy) {
        this.$store.dispatch('changeAscendancy', ascendancy);
      },
    },
  };
</script>

<style>
  .ascendancies .card-footer {
    border-top: 0;
  }

  .ascendancies .card-footer small {
    float: right;
  }

  .card .active {
    background: #02151D;
    color: #FBB200;
  }
</style>
