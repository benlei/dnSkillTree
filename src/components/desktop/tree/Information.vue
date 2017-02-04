<template>
  <div class="card information">
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
        <span>Skill Lv: {{ level || 1 }}</span>
        <span>Max Skill Lv: {{ softMaxLevel }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Type: {{ type }}</span>
        <span>Attribute: {{ attribute }}</span>
      </div>
      <div class="d-flex justify-content-between" v-if="spTotal && levelIndex">
        <span>SP: {{ sp }}</span>
        <span>Total SP: {{ spTotal }}</span>
      </div>
      <div class="d-flex justify-content-between" v-if="mpCost || hpCost">
        <span v-show="mpCost">Fee MP: {{ mpCost }}</span>
        <span v-show="hpCost">Fee HP: {{ hpCost }}</span>
      </div>
      <div v-if="cooldown">Cooldown: {{ cooldown }} sec</div>
      <div v-if="weapons">Required Weapon: {{ weapons | join(', ') }}</div>
    </div>

    <div class="card-block">
      <h6>Level Up Requirements</h6>
      <div v-if="levelUpReq">Character Level {{ levelUpReq }}</div>
      <div v-if="parentSkills" v-for="parentSkill in parentSkills">
        {{ messages[job.skills[parentSkill.id].name] }} Lv. {{ parentSkill.level }}
      </div>
      <div v-if="spCost">
        SP {{ spCost }}
      </div>
    </div>

    <div class="card-block">
      <h6>Skill Description</h6>
      <div class="description" v-html="description"></div>
    </div>
    <div class="card-block">
      <h6>Next Description</h6>
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
        'messages',
        'levelIndex',
        'active',
        'skill',
        'name',
        'level',
        'sp',
        'spTotal',
        'spCost',
        'hpCost',
        'mpCost',
        'type',
        'attribute',
        'cooldown',
        'weapons',
        'description',
        'softMaxLevel',
        'levelUpReq',
        'parentSkills',
      ]),
    },
    methods: {
      ...mapActions([
        'setMode',
      ]),
    },
    filters: {
      join: (arr, separator) => arr.join(separator),
    },
  };
</script>

<style scoped>
  .card .card-block + .card-block {
    padding-top: 0;
  }
</style>

<style>
  .information .card-header {
    background: #02151D;
    color: #fff;
  }

  .information .nav-link {
    color: #FFF;
  }

  .information .nav-item {
    width: 50%;
  }

  .information .nav-item a {
    border: 0;
  }

  .card-block {
    font-size: 80%;
  }

  span.o {
    color: #bf8100;
  }

  span.y {
    color: #888800;
  }

  span.p {
    color: #8a8166;
  }

  span.r {
    color: #a82121;
  }

  span.s {
    color: #699fb3;
  }

  span.v {
    color: #904f90;
  }
</style>
