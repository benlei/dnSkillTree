<template>
  <div class="col-lg-1">
    <div class="input-group justify-content-end">
      <span class="input-group-btn">
        <button class="btn btn-secondary" type="button" @click="toggleAlertModal">
          <i class="fa" :class="{ 'fa-check': validBuild, 'fa-exclamation-triangle': !validBuild }"/>
        </button>
      </span>

      <span class="input-group-btn status">
        <button class="btn btn-secondary" type="button" @click="toggleHelpModal">
          <i class="fa fa fa-question"/>
        </button>
      </span>
    </div>

    <Modal title="Issues" :toggle="toggleAlertModal" :display="alertModal" v-if="validBuild">
      This skill tree has no issues.
    </Modal>
    <Modal title="Issues" :toggle="toggleAlertModal" :display="alertModal" v-else>
      <div v-for="(violation, skillId) in violations">
        <a href="javascript:;" @click="jumpToSkill(skills[skillId])">{{ messages[skills[skillId].name]
          }}</a>
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
    </Modal>

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
  import { mapGetters, mapActions } from 'vuex';
  import jumpToSkill from '../../../lib/jumpToSkill';
  import Modal from './Modal';

  export default {
    data() {
      return {
        alertModal: false,
        helpModal: false,
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

      toggleHelpModal() {
        this.helpModal = !this.helpModal;
      },

      toggleAlertModal() {
        this.alertModal = !this.alertModal;
      },

      jumpToSkill(skill) {
        this.toggleAlertModal();
        window.scrollTo(0, 0);

        jumpToSkill(this, skill);
      },
    },

    components: {
      Modal,
    },
  };
</script>


<style>
  .fa {
    line-height: 1.5;
  }
</style>
