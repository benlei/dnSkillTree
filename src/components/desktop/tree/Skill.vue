<template>
  <div class="skill d-flex flex-column" v-if="id">
    <a href="javascript:;" class="skill-icon" :style="skillImageStyle"
       @click.prevent
       @mouseover="setActive(id)"
       @mousedown.stop.prevent="nextLevel"
       @contextmenu.stop.prevent="previousLevel">
      <div class="skill-border"
           :style="border"
           :class="{ grayscale: !level, crested, blink: relatedRecently }"/>
    </a>
    <small class="skill-level text-center"
           :class="{ green: techCount === 1, blue: techCount === 2 }"
    >{{ level ? level + techCount : 0 }}/{{ softMaxLevel }}
    </small>
  </div>
  <div class="skill" v-else/>
</template>

<script>
  import Level from '../../../lib/level';
  import skillMixin from '../../../mixins/skill';

  export default {
    mixins: [skillMixin],

    methods: {
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
    background: #fff;
  }

  .grayscale {
    background-position-y: -52px !important;
  }

  .skill-border.crested {
    background-position-y: 52px !important;

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
