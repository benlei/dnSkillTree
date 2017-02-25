<template>
  <div class="card" v-if="relatedSkills">
    <div class="card-header active">
      Related Skills
    </div>
    <div class="card-block">
      <a href="javascript:;" class="skill-icon d-inline-block" v-for="skill in relatedSkills"
         :style="skillImageStyle(skill)"
         @click.prevent="jumpToSkillTop(skill)"
      >
        <div class="skill-border" :style="border"/>
      </a>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { SKILL_BORDER } from '../../../../consts';

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
        'setActive',
      ]),

      skillImageStyle(skill) {
        return this.getSkillIconStyle(skill, 1);
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
