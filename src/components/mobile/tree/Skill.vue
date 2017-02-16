<template>
  <div class="mobile skill d-flex align-items-stretch" v-if="id">
    <div class="skill-icon" :style="skillImageStyle" :class="{ blink: relatedRecently }"
         @click="iconClick">
      <div class="skill-border" :style="border" :class="{ grayscale: !level, crested }"/>
    </div>
    <div class="d-flex flex-column mobile-level">
      <small class="skill-level mobile text-center"
             :class="{ green: techCount === 1, blue: techCount === 2 }"
      >{{ level ? level + techCount : 0 }}/{{ softMaxLevel }}
      </small>
      <div class="level-btn">
        <a href="javascript:;" v-if="canDelevel" @click.stop.prevent="previousLevel"><i
          class="fa mobile fa-minus-circle"/></a>
        <a href="javascript:;" v-if="canLevel" @click.stop.prevent="nextLevel"><i
          class="fa mobile fa-plus-circle float-right"/></a>
      </div>
    </div>
  </div>
  <div class="mobile skill empty" v-else/>
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

<style>
  .mobile.skill {
    width: 105px;
    height: 52px;
    margin: 8px 5px 17px 5px;
  }

  .mobile-level {
    padding-right: 5px;
    width: 100%;
  }

  .mobile.skill-level {
    margin-top: 5px;
    color: #fff;
  }

  .mobile.skill {
    background: #3a3a3a;
    border-radius: 10px 10px 0 10px;
  }

  .mobile.skill.empty {
    background: transparent;
  }

  .level-btn {
    margin-left: 5px;
  }

  .fa-minus-circle {
    margin-left: 5px;
    color: #a46a24;
  }

  .fa-plus-circle {
    margin-right: 5px;
    color: #DEA86C;
  }
</style>
