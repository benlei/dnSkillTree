<template>
  <div class="row build-input">
    <div class="col-lg-11">
      <div class="input-group">
        <span class="input-group-btn">
          <button class="btn btn-secondary" type="button" @click="softReset">
            <i class="fa fa-refresh"/>
          </button>
        </span>
        <input type="text" class="form-control"/>
        <span class="input-group-btn">
          <button class="btn btn-secondary" type="button">
            <i class="fa fa-files-o"/>
          </button>
        </span>
        <span class="input-group-btn">
          <button class="btn btn-secondary" type="button">
            <i class="fa fa-download"/>
          </button>
        </span>
      </div>
    </div>
    <Help/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import Help from './Help';

  export default {
    methods: {
      ...mapActions([
        'softReset',
      ]),
    },

    components: {
      Help,
    },
  };
</script>
<style>
  .build-input {
    margin-bottom: 1rem;
  }
</style>
