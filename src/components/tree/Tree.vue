<template>
  <div class="container">
    <Navigation />

    <div class="row">
      <div class="col-md-4">
        Hello, {{ $route.params.slug }}! This is for the selector and stuff.
      </div>
      <div class="col-md-4">
        This is the skill tree?
      </div>
      <div class="col-md-4">
        This is the description.
      </div>
    </div>
  </div>
</template>

<script>
//  import { mapGetters } from 'vuex';
  import Navigation from '../Navigation';

  export default {
    created() {
      this.$store.dispatch('loadJob', this.$route.params.slug);
    },
//    ...mapGetters({
//    }),
    components: {
      Navigation,
    },
  };
</script>
