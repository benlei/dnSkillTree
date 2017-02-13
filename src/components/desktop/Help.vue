<template>
  <div class="col-lg-1">
    <div class="input-group justify-content-end">
      <span class="input-group-btn status">
        <button class="btn btn-secondary" type="button" @click="toggleHelpModal">
          <i class="fa fa fa-question"/>
        </button>
      </span>
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
  </div>
</template>

<script>
  import Modal from './tree/Modal';

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
