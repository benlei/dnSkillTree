<template>
  <div>Hello, {{ $route.params.slug }}!</div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch('loadTree', this.$route.params.slug);
    },
  };
</script>
