<template>
  <div class="text-center">
    <router-link :to="to">
      <div class="mx-auto" :style="jobImageStyle" />
      <div class="jobTitle" v-if="name">
        {{ name }}
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    props: ['name', 'icon', 'to'],
    computed: {
      jobImageStyle() {
        const scale = 55;
        const xPos = (this.icon % 9) * scale;
        const yPos = Math.floor(this.icon / 9) * scale;

        return {
          backgroundImage: `url(${process.env.ASSETS_URL}/images/jobicon_main.png)`,
          height: `${scale}px`,
          width: `${scale}px`,
          backgroundPosition: `-${xPos}px -${yPos}px`,
        };
      },
    },
  };
</script>

<style>
  .jobTitle {
    margin-bottom: 5px;
    height: 50px;
    color: #373a3c;
    line-height: 1.25;
  }

  .jobCell a {
    text-decoration: none;
  }
</style>
