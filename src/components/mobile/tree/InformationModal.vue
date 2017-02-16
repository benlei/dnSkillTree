<template>
  <Modal title="Blahblah" :toggle="toggle" :display="display">
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
</template>

<script>
  import Modal from '../../Modal';

  export default {
    props: ['toggle', 'display'],

    components: {
      Modal,
    },
  };
</script>
