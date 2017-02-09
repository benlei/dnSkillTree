<template>
  <div class="card" v-if="relatedSkills">
    <div class="card-header active">
      Related Skills
    </div>
    <div class="card-block">
      <div class="skill-icon d-inline-block" v-for="skill in relatedSkills"
           :style="skillImageStyle(skill)"
           @click="jumpToSkill(skill)"
      >
        <div class="skill-border" :style="border"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { SKILL_BORDER } from '../../../consts';

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
        const icon = Math.floor(skill.icon / 200) + 1;
        const sprite = icon < 10 ? `0${icon}` : icon;
        const row = Math.floor((skill.icon % 200) / 10);
        const col = skill.icon % 10;

        return {
          backgroundImage: `url(${process.env.ASSETS_URL}/images/skillicon${sprite}.png)`,
          backgroundPosition: `-${col * 50}px -${row * 50}px`,
        };
      },

      jumpToSkill(skill) {
        const thiz = this;
        this.setAscendancy(skill.jobIndex);
        this.activateRelated(skill.id);
        window.scrollTo(0, 0);
        setTimeout(() => thiz.deactivateRelated(skill.id), 3000);
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
