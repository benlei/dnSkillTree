<template>
  <div class="skill d-flex flex-column" v-if="id">
    <div class="skill-icon" :style="skillImageStyle"
         :class="{ blink: relatedRecently }"
         @mouseover="setActive(id)"
         @click.stop.prevent="nextLevel"
         @contextmenu.stop.prevent="previousLevel"
    >
      <div class="skill-border"
           :style="border"
           :class="{ grayscale: !level, crested }"/>
    </div>
    <small class="skill-level text-center"
           :class="{ green: techCount === 1, blue: techCount === 2 }"
    >{{ level ? level + techCount : 0 }}/{{ softMaxLevel }}</small>
  </div>
  <div class="skill" v-else/>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  import Level from '../../../lib/level';
  import { SKILL_BORDER } from '../../../consts';

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
        const icon = Math.floor(skill.icon / 200) + 1;
        const sprite = icon < 10 ? `0${icon}` : icon;
        const row = Math.floor((skill.icon % 200) / 10);
        const col = skill.icon % 10;
        const suffix = this.level ? '' : '_b';

        return {
          backgroundImage: `url(${process.env.ASSETS_URL}/images/skillicon${sprite}${suffix}.png)`,
          backgroundPosition: `-${col * 50}px -${row * 50}px`,
        };
      },

      level() {
        const levels = this.build.levels;
        const skill = this.job.skills[this.id];
        return Level.valueOf(levels, skill);
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
        return crest === 0 || crest;
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

//      mouseover(id) {
//        if (id !== this.active) {
//          const thiz = this;
//          this.intervalId = setTimeout(() => thiz.setActive(id), 150);
//        }
//      },
//
//      mouseleave() {
//        clearInterval(this.intervalId);
//      },

      setActiveLevel(level) {
        if (this.skill.levelReq[Level.indexOf(level)] > 93) {
          return;
        }

        this.setLevel({
          skillId: this.id,
          level,
        });

        this.setActive(this.id);
      },

      nextLevel(e) {
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
          this.setActiveLevel(0);
        } else {
          this.setActiveLevel(this.level ? this.level - 1 : 0);
        }
      },
    },
  };
</script>

<style>
  .skill {
    height: 65px;
    width: 50px;
    margin: 8px 10px 12px 10px;
  }

  .skill-icon, .skill-border {
    height: 50px;
    width: 50px;
  }

  .skill-level {
    line-height: 1.5;
  }

  .skill-border.grayscale {
    -webkit-filter: grayscale(1);
    filter: grayscale(1);
  }

  .skill-border.crested {
    -webkit-filter: saturate(7) !important;
    filter: saturate(7) !important;
  }

  .skill-level.green {
    color: #4ea722;
  }

  .skill-level.blue {
    color: #3195bd;
  }

  .blink {
    animation: blink-animation .5s steps(2, start) infinite;
    -webkit-animation: blink-animation .5s steps(2, start) infinite;
  }

  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
  @-webkit-keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
</style>
