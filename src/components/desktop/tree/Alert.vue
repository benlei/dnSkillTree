<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="alert alert-success" v-if="validBuild">
        This build looks valid!
        <i class="fa fa-check-circle float-right"/>
      </div>
      <div class="alert alert-warning" v-else>
        There are potential issues with this build.
        <a href="javascript:;" class="float-right fa fa-exclamation-triangle" @click="toggleModal"/>
      </div>
    </div>

    <transition name="fade">
      <div class="modal-mask" v-if="showModal" @click.self="toggleModal">
        <div class="modal-dialog violations">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Conflicts</h5>
              <a href="javascript:;" class="fa fa-times" @click="toggleModal" />
            </div>

            <div class="modal-body">
              <div v-for="(violation, skillId) in violations">
                <a href="javascript:;" @click="jumpToSkill(skills[skillId])">{{ messages[skills[skillId].name] }}</a>
                <template v-if="violation.type === 'ascendancy'">
                  requires
                  <span class="comma-separated" v-for="d in violation.data">
                    {{ ascendancies[d.ascendancy].name }} SP Total {{ d.sp }} or above
                  </span>
                </template>
                <template v-else-if="violation.type === 'parent'">
                 requires
                  <span class="comma-separated" v-for="d in violation.data">
                    {{ messages[skills[d.id].name] }} Lv. {{ d.level }}
                  </span>
                </template>
                <template v-else>
                  conflicts with {{ messages[skills[violation.data].name] }}
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import jumpToSkill from '../../../lib/jumpToSkill';

  export default {
    data() {
      return {
        showModal: false,
      };
    },

    computed: {
      ...mapGetters([
        'skills',
        'messages',
        'ascendancies',
        'violations',
      ]),

      validBuild() {
        return !Object.keys(this.violations).length;
      },
    },

    methods: {
      ...mapActions([
        'activateRelated',
        'deactivateRelated',
        'setAscendancy',
      ]),

      toggleModal() {
        this.showModal = !this.showModal;
      },

      jumpToSkill(skill) {
        this.toggleModal();
        window.scrollTo(0, 0);
        jumpToSkill(this, skill);
      },
    },
  };
</script>


<style>
  .fa {
    line-height: 1.5;
  }

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
</style>
