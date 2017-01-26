<template>
  <div class="skill" :style="skillImageStyle" v-if="id">

  </div>
  <div class="skill" v-else />
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    props: ['id'],
    computed: {
      ...mapState({ job: 'job' }),
      skillImageStyle() {
        const skill = this.job.skills[this.id];
        const icon = Math.floor(skill.icon / 200) + 1;
        const sprite = icon < 10 ? `0${icon}` : icon;
        const row = Math.floor((skill.icon % 200) / 10);
        const col = skill.icon % 10;

        return {
          backgroundImage: `url(${process.env.ASSETS_URL}/images/skillicon${sprite}.png)`,
          backgroundPosition: `-${col * 50}px -${row * 50}px`,
        };
      },
    },
  };
</script>

<style>
  .skill {
    height: 50px;
    width: 50px;
  }
</style>
