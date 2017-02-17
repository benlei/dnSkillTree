<template>
  <transition name="fade" v-if="display" v-on:enter="toggleHideOverflow" v-on:after-leave="toggleHideOverflow">
    <div class="modal" @click.self="toggle" :class="{ mobile: isMobile() }">
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
  const html = document.getElementsByTagName('html')[0];

  export default {
    props: ['title', 'toggle', 'display'],
    methods: {
      toggleHideOverflow() {
        html.classList.toggle('hide-overflow-y');
      },
    },
  };
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  .modal {
    background-color: rgba(0, 0, 0, .5);
    display: block;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .violations {
    position: absolute;
    margin: 30px auto;
    top: 0;
    left: 0;
    right: 0;
    width: 90%;
  }

  .hide-overflow-y {
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .modal.mobile {
    font-size: 80%;
  }
</style>
