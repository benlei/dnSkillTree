<template>
  <div class="col-lg-4">
    <Ascendancies />
    <BuildInput />
  </div>
</template>

<script>
  import Ascendancies from './Ascendancies';
  import BuildInput from './BuildInput';

  export default {
    components: {
      Ascendancies,
      BuildInput,
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
