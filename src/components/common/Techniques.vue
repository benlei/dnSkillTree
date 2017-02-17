<template>
  <div class="d-flex justify-content-between">
    <div class="d-inline unselectable">
      <span class="tech" v-for="tech in skill.techs">
        <a href="javascript:;" class="fa"
           :class="{ 'fa-circle-thin': !isTeched(tech), 'fa-circle': isTeched(tech) }"
           @click.prevent="gearTech(tech)"
        /> {{ tech | techName }}
      </span>
    </div>

    <div class="crest-tech unselectable">
      <a href="javascript:;" class="fa"
         :class="{ 'fa-circle-thin': !isTeched(0), 'fa-circle': isTeched(0) }"
         @click.prevent="crestTech"
      /> Crest
    </div>
  </div>
</template>

<script>
  import techs from '../../mixins/techs';

  export default {
    mixins: [techs],
  };
</script>

<style scoped>
  .card .card-block + .card-block {
    padding-top: 0;
  }
</style>

<style>
  .tech {
    margin-right: 1.25rem;
  }

  .tech .fa, .crest-tech .fa {
    margin-right: 3px;
  }

  a.fa {
    color: inherit !important;
  }
</style>
