<template>
  <div class="d-flex justify-content-between">
    <div class="d-inline unselectable">
      <ul class="tech">
        <li v-for="tech in skill.techs" @click.prevent="gearTech(tech)">
          <a href="javascript:;" class="fa"
             :class="{ 'fa-circle-thin': !isTeched(tech), 'fa-circle': isTeched(tech) }"
          /><a href="javascript:;" class="text-black"> {{ tech | techName }}</a>
        </li>
      </ul>
    </div>

    <div class="crest-tech unselectable" @click.prevent="crestTech">
      <a href="javascript:;" class="fa"
         :class="{ 'fa-circle-thin': !isTeched(0), 'fa-circle': isTeched(0) }"
      /><a href="javascript:;" class="text-black">Crest</a>
    </div>
  </div>
</template>

<script>
  import techs from '../../mixins/techs';

  export default {
    mixins: [techs],
  };
</script>


<style>
  .tech {
    list-style-type: none;
    padding-left: 0;
    margin-left: 3px;
    margin-bottom: 0;
  }

  .tech .fa, .crest-tech .fa {
    margin-right: 3px;
  }

  .fa span {
    font: inherit !important;
  }

  a.fa {
    color: inherit !important;
  }

  .text-black {
    color: #000 !important;
  }
</style>
