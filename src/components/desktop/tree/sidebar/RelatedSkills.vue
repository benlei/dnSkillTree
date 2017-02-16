<template>
  <div class="card" v-if="relatedSkills">
    <div class="card-header active">
      Related Skills
    </div>
    <div class="card-block">
      <a href="javascript:;" class="skill-icon d-inline-block" v-for="skill in relatedSkills"
           :style="skillImageStyle(skill)"
           @click.prevent="jumpToSkill(skill)"
      >
        <div class="skill-border" :style="border"/>
      </a>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { SKILL_BORDER } from '../../../../consts';
  import skillIconStyle from '../../../../lib/skillIconStyle';
  import jumpToSkill from '../../../../lib/jumpToSkill';

  export default {
    data() {
      return {
        border: {
          background: SKILL_BORDER,
        },
      };
    },
    computed: {
      ...mapGetters([
        'relatedSkills',
        'messages',
      ]),
    },

    methods: {
      ...mapActions([
        'setAscendancy',
        'setActive',
        'activateRelated',
        'deactivateRelated',
      ]),

      skillImageStyle(skill) {
        return skillIconStyle(skill, 1);
      },

      jumpToSkill(skill) {
        this.toTop();
        jumpToSkill(this, skill);
      },
    },
  };
</script>

<style scoped>
  .skill-icon {
    margin-right: .5rem;
  }


  .card-block {
    padding-bottom: .5rem;
    padding-top: .5rem;
  }
</style>
