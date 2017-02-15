<template>
  <footer>
    <hr/>

    <div class="row">
      <div class="col-lg-12 d-flex justify-content-between">
        <ul class="list-unstyled">
          <li><a href="#">NA</a></li>
          <li><a href="#">SEA</a></li>
        </ul>

        <ul class="list-unstyled text-right">
          <li><a href="javascript:;" @click.prevent="toggleHelpModal">Help</a></li>
          <li><router-link :to="{name:'mobile-home'}">Mobile</router-link></li>
        </ul>
      </div>
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
  .list-unstyled {
    margin: 0 1.5rem;
  }

  hr {
    margin: .5rem;
  }
</style>
