<template>
  <div class="card description">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item text-center">
          <a class="nav-link" @click="setMode(0)" :class="{active: !build.mode}" href="javascript:void(0)">PvE</a>
        </li>
        <li class="nav-item text-center">
          <a class="nav-link" @click="setMode(1)" :class="{active: build.mode}" href="javascript:void(0)">PvP</a>
        </li>
      </ul>
    </div>
    <div class="card-block">
      <h5>Super Serious Punch</h5>
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <p class="card-text">Mode: {{ build.mode }}</p>
      <p class="card-text">Mode: {{ active }}</p>
      <p class="card-text">Also: Alternative 1, Alternative 2</p>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapState([
        'job',
        'build',
      ]),
      ...mapGetters([
        'active',
      ]),
    },
    methods: {
      ...mapActions([
        'setMode',
      ]),
    },
  };
</script>
