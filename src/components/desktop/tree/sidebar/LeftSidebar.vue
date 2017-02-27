<template>
  <div class="col-md-4">
    <Ascendancies/>

    <div class="card" v-if="skill.spMaxLevel">
      <div class="card-header active">
        Techniques
      </div>
      <div class="card-block">
        <Techniques/>
      </div>
    </div>

    <Crests/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Ascendancies from './Ascendancies';
  import Crests from './Crests';
  import Techniques from '../../../common/Techniques';

  export default {
    computed: {
      ...mapGetters([
        'active',
        'skill',
      ]),
    },

    components: {
      Ascendancies,
      Crests,
      Techniques,
    },
  };
</script>

<style>
  .card .active {
    background: #02151D;
    color: #FFF;
    border-color: rgba(0, 0, 0, 0.121569);
  }

  .card {
    border-color: #02151D;
    margin-bottom: 20px;
  }

  .card .list-group-item {
    font-size: 80%;
  }
</style>
