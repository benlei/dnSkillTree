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
      <div>
        <span>Skill Lv: {{ meta.level }}</span>
        <span class="float-right">Max Skill Lv: {{ meta.maxLevel }}</span>
      </div>
      <div>
        <span>Type: {{ type }}</span>
        <span class="float-right">Attribute: {{ attribute }}</span>
      </div>
      <div v-if="meta.cd || meta.spTotal">
        <span v-if="meta.cd">Cooldown: {{ meta.cd }} sec</span>
        <span class="float-right" v-if="meta.spTotal">Total SP: {{ meta.spTotal }}</span>
      </div>
      <div v-if="meta.hp || meta.mp">
        <span v-if="meta.mp">Fee MP: {{ meta.mp }}</span>
        <span class="float-right" v-if="meta.hp">Fee HP: {{ meta.hp }}</span>
      </div>
      <div v-if="weapons">Required Weapon: {{ weapons | join(', ') }}</div>
    </div>

    <div class="card-block">
      <h6>Level Up Requirements</h6>
      <div v-if="next.levelReq">Character Level {{ next.levelReq }}</div>
      <div v-if="next.parents" v-for="parent in next.parents">
        {{ messages[job.skills[parent.id].name] }} Lv. {{ parent.level }}
      </div>
      <div v-if="next.spCost">
        SP {{ next.spCost }}
      </div>
    </div>

    <div class="card-block">
      <h6>Skill Description</h6>
      <div class="description" v-html="description" />
    </div>
    <div class="card-block" v-if="nextDescription">
      <h6>Next Description</h6>
      <div class="next-description" v-html="nextDescription" />
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
        'skill',
        'name',
        'meta',
        'type',
        'attribute',
        'weapons',
        'next',
        'description',
        'nextDescription',
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
