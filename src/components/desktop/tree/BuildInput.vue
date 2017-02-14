<template>
  <div class="row build-input">
    <div class="col-lg-11">
      <div class="input-group">
        <input type="text" class="form-control" :value="buildUrl"/>
        <span class="input-group-btn">
          <button class="btn btn-secondary" type="button" title="Copy">
            <i class="fa fa-files-o"/>
          </button>
        </span>
        <span class="input-group-btn">
          <button class="btn btn-secondary" type="button" @click="reset" title="Reset">
            <i class="fa fa-refresh"/>
          </button>
        </span>
      </div>
    </div>
    <Alert/>
    <!--<Help/>-->
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Alert from './Alert';

  export default {
    data() {
      let location = window.location.href;
      location = location.substring(0, location.indexOf('#'));

      return {
        location,
      };
    },

    watch: {
      path(newPath) {
        const slug = this.$route.params.slug;
        const name = newPath.length ? 'desktop-build' : 'desktop';

        this.$router.replace({
          name,
          params: {
            slug,
            path: newPath,
          },
        });
      },
    },

    computed: {
      ...mapGetters([
        'path',
      ]),

      buildUrl() {
        const path = this.path;
        const slug = this.$route.params.slug;
        if (path.length) {
          return `${this.location}#/${slug}/${this.path}`;
        }

        return `${this.location}#/${slug}`;
      },
    },

    methods: {
      ...mapActions([
        'reset',
      ]),
    },

    components: {
      Alert,
    },
  };
</script>

<style>
  .build-input {
    margin-bottom: 1rem;
  }
</style>
