<template>
  <div class="d-flex justify-content-between">
    <div class="d-inline unselectable">
      <span class="tech" v-for="tech in skill.techs">
        <a href="javascript:;" class="fa"
           :class="{ 'fa-circle-o': !isTeched(tech), 'fa-check-circle-o': isTeched(tech) }"
           @click.prevent="gearTech(tech)"
        /> {{ tech | techName }}
      </span>
    </div>

    <div class="crestTech unselectable">
      <a href="javascript:;" class="fa"
         :class="{ 'fa-circle-o': !isTeched(0), 'fa-check-circle-o': isTeched(0) }"
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

  a.fa {
    color: inherit !important;
  }
</style>
