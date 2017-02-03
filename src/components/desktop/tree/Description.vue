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
      <h5>{{ name }}</h5>
      <div class="d-flex justify-content-between">
        <span>Skill Lv: {{ level }}</span>
        <span>Max Lv: {{ skill.maxLevel }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Type: {{ type }}</span>
        <span>Attribute: {{ attribute }}</span>
      </div>
      <div class="d-flex justify-content-between" v-if="level">
        <span>SP: {{ spCost }}</span>
        <span>Total SP: {{ spCostTotal }}</span>
      </div>
      <div class="d-flex justify-content-between" v-if="mpCost || hpCost">
        <span v-show="mpCost">Fee MP: {{ mpCost }}</span>
        <span v-show="hpCost">Fee HP: {{ hpCost }}</span>
      </div>
      <div v-if="cooldown">Cooldown: {{ cooldown }} sec</div>
      <div v-if="weapons">Required Weapon: {{ weapons | join(', ') }}</div>
    </div>
    <div class="card-block">
      <span>Level Up Requirements</span>
    </div>
    <div class="card-block">
      <span>Skill Description</span>
    </div>
    <div class="card-block">
      <span>Next Description</span>
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
        'skill',
        'name',
        'level',
        'spCost',
        'spCostTotal',
        'hpCost',
        'mpCost',
        'type',
        'attribute',
        'cooldown',
        'weapons',
      ]),
    },
    methods: {
      ...mapActions([
        'setMode',
      ]),
    },
    filters: {
      join(arr, separator) {
        return arr.join(separator);
      },
    },
  };
</script>

<style scoped>
  .card .card-block + .card-block {
    padding-top: 0;
  }
</style>
