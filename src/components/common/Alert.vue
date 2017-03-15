<template>
  <div :class="col">
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
      <div class="modal-block">
        This skill tree has no issues.
      </div>

      <Overview :jump="jump"/>
    </Modal>
    <Modal title="Issues" :toggle="toggleAlertModal" :display="alertModal" v-else>
      <div class="modal-block">
        <div v-for="(violation, skillId) in violations">
          <a href="javascript:;" @click="jump(skills[skillId])">{{ skillName(skillId) }}</a>
          <template v-if="violation.type === 'ascendancy'">
            requires
            <span class="comma-separated" v-for="d in violation.data">
            {{ ascendancies[d.ascendancy].name }} SP Total {{ d.sp }} or above
          </span>
          </template>
          <template v-else-if="violation.type === 'parent'">
            requires
            <span class="comma-separated" v-for="d in violation.data">
            {{ skillName(d.id) }} Lv. {{ d.level }}
          </span>
          </template>
          <template v-else>
            conflicts with {{ skillName(violation.data) }}
          </template>
        </div>
      </div>

      <Overview :jump="jump" />
    </Modal>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Modal from '../Modal';
  import Overview from './Overview';

  export default {
    props: ['col'],

    data() {
      return {
        alertModal: false,
      };
    },

    computed: {
      ...mapGetters([
        'skills',
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
      toggleAlertModal() {
        this.alertModal = !this.alertModal;
      },

      jump(skill) {
        this.toggleAlertModal();
        this.jumpToSkillTop(skill);
      },
    },

    components: {
      Modal,
      Overview,
    },
  };
</script>
