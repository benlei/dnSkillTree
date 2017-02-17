<template>
  <footer class="footer">
    <hr/>

    <div class="d-flex justify-content-between">
      <ul class="list-unstyled">
        <li><a href="#">NA</a></li>
        <li><a href="#">SEA</a></li>
      </ul>

      <ul class="list-unstyled text-right">
        <li><a href="javascript:;" @click.prevent="toggleHelpModal">Help</a></li>
        <li>
          <router-link :to="invertedRoute" @click.native="toTop">
            <template v-if="isMobile()">
              Desktop
            </template>
            <template v-else>
              Mobile
            </template>
          </router-link>
        </li>
      </ul>
    </div>

    <Modal title="Controls" :toggle="toggleHelpModal" :display="helpModal">
      <p><kbd>click</kbd> a skill icon to increase its level by 1.<br/>
        <kbd><kbd>ctrl</kbd> + <kbd>click</kbd></kbd> a skill icon to cap it out. Alias: <kbd><kbd>shift</kbd> + <kbd>click</kbd></kbd>
      </p>

      <p><kbd>leftclick</kbd> a skill icon to decrease its level by 1.<br/>
        <kbd><kbd>ctrl</kbd> + <kbd>leftclick</kbd></kbd> a skill icon set it to its lowest level. Alias: <kbd><kbd>shift</kbd>
          + <kbd>leftclick</kbd></kbd></p>

      <p>
        <small>note: the alias controls may not work for all browsers</small>
      </p>
    </Modal>
  </footer>
</template>

<script>
  import Modal from './Modal';

  export default {
    data() {
      return {
        helpModal: false,
      };
    },

    computed: {
      invertedRoute() {
        const path = this.$route.fullPath;

        if (this.isMobile()) {
          return path.substring(2);
        }

        return `/m${path}`;
      },
    },

    methods: {
      toggleHelpModal() {
        this.helpModal = !this.helpModal;
      },
    },

    components: {
      Modal,
    },
  };
</script>

<style>
  hr {
    margin-bottom: .5rem;
  }

  .list-unstyled {
    margin: 0 .5rem;
  }
</style>
