<template>
  <div class="col-lg-1">
    <div class="input-group justify-content-end">
      <span class="input-group-btn">
        <button class="btn btn-secondary" type="button"
                @click="toggleAlertModal"
                :title="validBuild ? 'Your build is valid!' : 'There are issues with this build.'"
        >
          <i class="fa" :class="statusClass"/>
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
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import jumpToSkill from '../../../lib/jumpToSkill';
  import Modal from '../../common/Modal';

  export default {
    data() {
      return {
        alertModal: false,
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

      statusClass() {
        const valid = this.validBuild;
        return {
          'text-success': valid,
          'fa-check': valid,
          'text-warning': !valid,
          'fa-exclamation-triangle': !valid,
        };
      },
    },

    methods: {
      ...mapActions([
        'activateRelated',
        'deactivateRelated',
        'setAscendancy',
      ]),

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
