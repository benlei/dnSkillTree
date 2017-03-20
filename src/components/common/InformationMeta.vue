<template>
  <div :class="{'card-block': !isMobile(), 'modal-block': isMobile()}">
    <template v-if="!isMobile()">
      <h5>{{ name }}</h5>
      <div>
        <span>Level: {{ meta.level }}{{ techCount? ' +' + techCount : null}}</span>
        <span class="float-right">Max Level: {{ meta.maxLevel }}</span>
      </div>
    </template>

    <div>
      <span>Type: {{ type }}</span>
      <span class="float-right">Attribute: {{ attribute }}</span>
    </div>

    <div v-if="meta.hp || meta.mp">
      <span v-if="meta.mp">Fee MP: {{ meta.mp }}</span>
      <span class="float-right" v-if="meta.hp">Fee HP: {{ meta.hp }}</span>
    </div>

    <div v-if="meta.cd || meta.spTotal">
      <span v-if="meta.cd">Cooldown: {{ meta.cd }} sec</span>
      <span class="float-right" v-if="meta.spTotal">Total SP: {{ meta.spTotal }}</span>
    </div>

    <div v-if="weapons">Required Weapon: {{ weapons | join(', ') }}</div>

    <div v-if="altSkills">
      Alternatives:
      <span v-for="altSkill in altSkills" class="comma-separated">
          <template v-if="altSkill.id === activeAlt">
            <span>{{ skillName(altSkill.id) }}</span>
          </template>
          <template v-else>
            <a href="javascript:;"
               @click="setActiveAlt(altSkill.id)">{{ skillName(altSkill.id) }}</a>
          </template>
        </span>
    </div>
  </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'name',
        'meta',
        'techCount',
        'type',
        'attribute',
        'weapons',
        'altSkills',
        'activeAlt',
      ]),
    },

    methods: {
      ...mapActions([
        'setActiveAlt',
      ]),
    },
  };
</script>
