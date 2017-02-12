<template>
  <transition name="fade" v-if="display">
    <div class="modal-mask" @click.self="toggle">
      <div class="modal-dialog violations">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{ title }}</h4>
            <a href="javascript:;" class="fa fa-times" @click.prevent="toggle"/>
          </div>

          <div class="modal-body">
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: ['title', 'toggle', 'display'],
  };
</script>

<style>

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .violations {
    z-index: 100;
    position: absolute;
    margin: 30px auto;
    top: 0;
    left: 0;
    right: 0;
  }

  .modal-dialog {
    max-width: 640px;
  }
</style>
