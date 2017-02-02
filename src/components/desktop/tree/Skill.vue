<template>
  <div class="skill d-flex flex-column" v-if="id">
    <div class="skill-icon" :style="skillImageStyle"
         @mouseover="setActive(id)">
      <div class="skill-border" :style="border" :class="{grayscale: !level}"/>
    </div>
    <small class="skill-level text-center">{{ level }}/{{ maxLevel }}</small>
  </div>
  <div class="skill" v-else/>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

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

      skillImageStyle() {
        const skill = this.job.skills[this.id];
        const icon = Math.floor(skill.icon / 200) + 1;
        const sprite = icon < 10 ? `0${icon}` : icon;
        const row = Math.floor((skill.icon % 200) / 10);
        const col = skill.icon % 10;
        const level = this.level;
        const suffix = level ? '' : '_b';

        return {
          backgroundImage: `url(${process.env.ASSETS_URL}/images/skillicon${sprite}${suffix}.png)`,
          backgroundPosition: `-${col * 50}px -${row * 50}px`,
        };
      },

      level() {
        const skill = this.job.skills[this.id];
        const level = this.build.levels[this.id] || 0;

        if (skill.levelReq[0] === 1) {
          return 1 + level;
        }

        return level;
      },

      maxLevel() {
        return this.job.skills[this.id].maxLevel;
      },
    },
    methods: {
      ...mapActions([
        'setActive',
      ]),
    },
  };
</script>

<style>
  .skill {
    height: 65px;
    width: 50px;
    margin: 8.25px 10px;
  }

  .skill-icon, .skill-border {
    height: 50px;
    width: 50px;
  }

  .skill-level {
    line-height: 1.25;
  }

  .skill-border.grayscale {
    -webkit-filter: grayscale(1);
    filter: grayscale(1);
  }
</style>
