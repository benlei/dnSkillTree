<template>
  <div class="card" v-if="crests[active]">
    <div class="card-header active">
      {{ locale.skillCrest }}
    </div>
    <ul class="list-group list-group-flush crest">
      <li class="list-group-item" @click="setCrest(-1)">
        <a href="javascript:;" class="w-100" :class="{'crest-selected': !isCrested()}">
          None
        <template v-if="crestCount === 7">(already have 7 crests equipped)</template>
        </a>
      </li>
      <li class="list-group-item crest unselectable" v-for="(crest, crestIndex) in crests[active]"
          @click="crestCount < 7 && setCrest(crestIndex)">
        <a href="javascript:;" v-html="crestDescription(crestIndex)"
           class="w-100" :class="{'crest-selected': isCrested(crestIndex)}" />
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import crestsMixin from '../../../../mixins/crests';

  export default {
    mixins: [crestsMixin],

    computed: {
      ...mapGetters([
        'messages',
      ]),
    },
  };
</script>

<style>
  .crest-selected:before {
    content: '\000BB ';
    color: #000;
    padding-right:3px;
  }

  .crest a {
    color: inherit;
  }
</style>
