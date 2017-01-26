<template>
  <div class="col-md-6 jobCell">
    <router-link :to="'/' + slug">
      <div class="jobImage" :style="jobImageStyle" />
      <div class="jobTitle">
        {{ name }}
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    props: ['name', 'icon', 'slug'],
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
  .jobCell {
    text-align: center;
    float: left;
  }

  .jobImage {
    margin: 0 auto;
    display: block;
  }

  .jobTitle {
    margin-bottom: 5px;
    height: 45px;
    color: #373a3c;
    line-height: 1.3;
  }

  .jobCell a {
    text-decoration: none;
  }
</style>
