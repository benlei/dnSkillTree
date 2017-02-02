<template>
  <div class="col-lg-4">
    <template v-if="active !== -1">
      <Description />

      <div class="card">
        <div class="card-header active">
          Related Skills
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Skill A</li>
          <li class="list-group-item">Skill B</li>
          <li class="list-group-item">Skill C</li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import Description from './Description';

  export default {
    computed: {
      ...mapState([
        'job',
        'build',
      ]),
      ...mapGetters([
        'active',
      ]),
    },
    components: {
      Description,
    },
  };
</script>

<style>
  .description .card-header {
    background: #02151D;
    color: #fff;
  }

  .description .nav-link {
    color: #FFF;
  }

  .description .nav-item {
    width: 50%;
  }

  .description .nav-item a {
    border: 0;
  }

  .alternative-skills {
    margin-bottom: 10px;
  }
</style>
