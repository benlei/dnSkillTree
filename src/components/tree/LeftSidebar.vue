<template>
  <div class="col-md-4">
    <div class="card ascendancies">
      <ul class="list-group list-group-flush">
        <li class="list-group-item justify-content-start ascendancy"
            :class="{active: build.ascendancy == i}"
            v-for="(ascendancy, i) in job.ascendancies"
            v-on:click="build.ascendancy = i">
          <i class="p-2" :style="getJobIconStyle(i)" />
          <span class="p-2">{{ ascendancy.name }}</span>
          <small class="ml-auto p-2">0 / {{ ascendancy.sp }}</small>
        </li>
        <li class="list-group-item justify-content-between"
            :class="{active: build.ascendancy == 3}"
            v-on:click="build.ascendancy = 3"
            v-if="job.tree.length == 4">
          Awakened
        </li>
      </ul>
      <div class="card-footer text-muted justify-content-between disabled">
        Total SP
        <small>0 / {{ job.sp }}</small>
      </div>
    </div>

    <div class="card">
      <div class="card-header build">
        Build
      </div>
      <div class="card-block">
        <div class="input-group">
          <input type="text" class="form-control">
          <span class="input-group-btn">
            <button class="btn btn-secondary" type="button"><i class="fa fa-files-o" /></button>
            <!--<button class="btn btn-secondary" type="button"><i class="fa fa-upload" /></button>-->
          </span>
          <span class="input-group-btn">
            <button class="btn btn-secondary" type="button">
              <i class="fa fa-download" />
            </button>
          </span>
        </div>
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
      getJobIconStyle(ascendancy) {
        const icon = this.job.ascendancies[ascendancy].icon;
        const scale = 28.5;
        const xPos = (icon % 9) * scale;
        const yPos = Math.floor(icon / 9) * scale;

        return {
          backgroundImage: `url(${process.env.ASSETS_URL}/images/jobicon_pvp.png)`,
          backgroundPosition: `-${xPos}px -${yPos}px`,
          height: '28.5px',
          width: '28.5px',
        };
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
    border-color: #ededed;
  }
  .card .active, .build {
    background: #02151D;
    color: #FFF;
  }

  .card {
    border-color: #02151D;
  }

  .card {
    margin-bottom: 20px;
  }
</style>
