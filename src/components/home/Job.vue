<template>
  <div class="col-md-6 jobCell">
    <router-link :to="'/' + slug">
      <div class="jobImage" :style="styleObject" />
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
      styleObject() {
        const xPos = (this.icon % 9) * 55;
        const yPos = Math.floor(this.icon / 9) * 55;

        return {
          backgroundImage: `url(${process.env.ASSETS_URL}/images/jobicon_main.png)`,
          height: '55px',
          width: '55px',
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
    height: 50px;
    color: #373a3c;
  }

  .jobCell a {
    text-decoration: none;
  }
</style>
