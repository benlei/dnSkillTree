<template>
  <div class="skill d-flex flex-column" v-if="id">
    <div class="skill-icon" :style="skillImageStyle" :class="{ blink: relatedRecently }"
         @click="iconClick">
      <div class="skill-border" :style="border" :class="{ grayscale: !level, crested }"/>
    </div>
    <small class="skill-level text-center"
           :class="{ green: techCount === 1, blue: techCount === 2 }"
    >{{ level ? level + techCount : 0 }}/{{ softMaxLevel }}
    </small>
  </div>
  <div class="skill empty" v-else/>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  import Level from '../../../lib/level';
  import { SKILL_BORDER } from '../../../consts';
  import Modal from '../../Modal';

  export default {
    props: ['id', 'toggle'],

    data() {
      return {
        border: {
          background: SKILL_BORDER,
        },
      };
    },

    computed: {
      ...mapState([
        'job',
        'build',
      ]),

      ...mapGetters([
        'active',
        'index',
      ]),

      skill() {
        return this.job.skills[this.id];
      },

      softMaxLevel() {
        return this.skill.maxLevel - this.skill.spMaxLevel;
      },

      skillImageStyle() {
        const skill = this.skill;
        return this.getSkillIconStyle(skill, this.level);
      },

      level() {
        const indexes = this.build.indexes;
        const skill = this.job.skills[this.id];
        return Level.valueOf(indexes, skill);
      },

      techCount() {
        let count = 0;

        if (this.build.crestTech === this.id) {
          count += 1;
        }

        if (this.build.techs.indexOf(this.id) !== -1) {
          count += 1;
        }

        return Math.min(this.skill.spMaxLevel, count);
      },

      crested() {
        const crest = this.build.crests[this.id];
        return crest >= 0;
      },

      relatedRecently() {
        return this.build.related[this.id] === 1;
      },

      canLevel() {
        return this.level < this.softMaxLevel;
      },

      canDelevel() {
        if (this.skill.levelReq[0] === 1) {
          return this.level > 1;
        }

        return this.level;
      },
    },

    methods: {
      ...mapActions([
        'setActive',
        'setLevel',
      ]),

      setActiveLevel(level) {
        if (this.skill.levelReq[Level.indexOf(level)] > process.env.LEVEL_CAP) {
          return;
        }

        this.setLevel({
          skillId: this.id,
          level,
        });

        this.setActive(this.id);
      },

      nextLevel() {
        this.setActiveLevel(this.level < this.softMaxLevel ?
          this.level + 1 : this.level);
      },

      previousLevel() {
        this.setActiveLevel(this.level - 1);
      },

      iconClick() {
        this.setActive(this.id);
        this.toggle();
      },
    },

    components: {
      Modal,
    },
  };
</script>
