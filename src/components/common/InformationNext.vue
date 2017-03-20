<template>
  <div :class="{'card-block': !isMobile(), 'modal-block': isMobile()}" v-if="nextDescription">
    <template v-if="isMobile()">
      <h5 v-if="level < softMaxLevel">{{ locale.nextLevel }}</h5>
      <h5 v-else>{{ locale.plus1ItemEffect }}</h5>
    </template>
    <template v-else>
      <h6 v-if="level < softMaxLevel">{{ locale.nextLevel }}</h6>
      <h6 v-else>{{ locale.plus1ItemEffect }}</h6>
    </template>
    <div class="next-description" v-html="nextDescription"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'nextDescription',
        'level',
        'softMaxLevel',
      ]),
    },
  };
</script>
