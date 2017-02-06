<template>
  <div class="skill d-flex flex-column" v-if="id">
    <div class="skill-icon" :style="skillImageStyle"
         @mouseover="setActive(id)"
         @click.stop.prevent="nextLevel"
         @contextmenu.stop.prevent="previousLevel"
    >
      <div class="skill-border" :style="border" :class="{grayscale: !level}"/>
    </div>
    <small class="skill-level text-center">{{ level }}/{{ softMaxLevel }}</small>
  </div>
  <div class="skill" v-else/>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  import Level from '../../../lib/level';

  export default {
    props: ['id'],
    data() {
      return {
        border: {
          background: `url('${process.env.ASSETS_URL}/images/uit_gesturebutton.png') 100px 0px`,
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
    },
    methods: {
      ...mapActions([
        'setActive',
        'setLevel',
      ]),

      setActiveLevel(level) {
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
</style>
