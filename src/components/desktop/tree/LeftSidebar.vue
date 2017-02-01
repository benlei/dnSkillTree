<template>
  <div class="col-lg-4">
    <div class="card ascendancies">
      <ul class="list-group list-group-flush">
        <li class="list-group-item ascendancy justify-content-between"
            :class="{active: build.ascendancy == i}"
            v-for="(ascendancy, i) in job.ascendancies"
            v-on:click="build.ascendancy = i">
          {{ ascendancy.name }}
          <small>0 / {{ ascendancy.sp }}</small>
        </li>
        <li class="list-group-item ascendancy"
            :class="{active: build.ascendancy == 3}"
            v-on:click="build.ascendancy = 3"
            v-if="job.tree.length == 4">
          Awakened
        </li>
      </ul>
      <div class="card-footer d-flex text-muted justify-content-between disabled">
        Total SP
        <small>0 / {{ job.sp }}</small>
      </div>
    </div>

    <div class="card">
      <div class="card-header active">
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

  .card .ascendancy.active {
    background: #FBB200;
  }

  .card .active {
    background: #02151D;
    color: #FFF;
    border-color: rgba(0, 0, 0, 0.121569);
  }

  .card {
    border-color: #02151D;
  }

  .card {
    margin-bottom: 20px;
  }
</style>
