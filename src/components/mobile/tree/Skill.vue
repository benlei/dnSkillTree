<template>
  <div class="mobile skill d-flex align-items-stretch" v-if="id">
    <div class="skill-icon" :style="skillImageStyle"
       :class="{ blink: relatedRecently }"
    >
      <div class="skill-border"
           :style="border"
           :class="{ grayscale: !level, crested }"/>
    </div>
    <div class="d-flex flex-column mobile-level">
      <small class="skill-level mobile text-center"
             :class="{ green: techCount === 1, blue: techCount === 2 }"
      >{{ level ? level + techCount : 0 }}/{{ softMaxLevel }}
      </small>
      <div class="level-btn">
        <i class="fa mobile fa-minus" /> <i class="fa mobile fa-plus" />
      </div>
    </div>
  </div>
  <div class="mobile skill empty" v-else/>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  import Level from '../../../lib/level';
  import { SKILL_BORDER } from '../../../consts';
  import skillIconStyle from '../../../lib/skillIconStyle';

  export default {
    props: ['id'],
    data() {
      return {
        border: {
          background: SKILL_BORDER,
        },
//        intervalId: null,
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
        return skillIconStyle(skill, this.level);
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

      nextLevel(e) {
        if (e.button) { // left click only
          return;
        }

        if (e.shiftKey || e.ctrlKey) {
          if (this.level < this.softMaxLevel) {
            this.setActiveLevel(this.softMaxLevel);
          }
        } else {
          this.setActiveLevel(this.level < this.softMaxLevel ?
            this.level + 1 : this.level);
        }
      },

      previousLevel(e) {
        if (e.shiftKey || e.ctrlKey) {
          this.setActiveLevel(-1);
        } else {
          this.setActiveLevel(this.level - 1);
        }
      },
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

  .fa-plus, .fa-minus {
    color: #DEA86C;
    margin-left: 5px;
  }
</style>
