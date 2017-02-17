<template>
  <Modal :title="name" :toggle="toggle" :display="display">
    <div class="modal-block">
      <div class="form-group">
        <select class="form-control">
          <option v-for="(_, lvl) in meta.maxLevel + 1" :disabled="skill.levelReq[lvl] === 1" :selected="level === lvl">
            Lv. {{ lvl }}{{ techCount? ' +' + techCount : null}}
          </option>
        </select>
      </div>
      <div>
        <span>Type: {{ type }}</span>
        <span class="float-right">Attribute: {{ attribute }}</span>
      </div>
      <div v-if="meta.hp || meta.mp">
        <span v-if="meta.mp">Fee MP: {{ meta.mp }}</span>
        <span class="float-right" v-if="meta.hp">Fee HP: {{ meta.hp }}</span>
      </div>
      <div v-if="meta.cd || meta.spTotal">
        <span v-if="meta.cd">Cooldown: {{ meta.cd }} sec</span>
        <span class="float-right" v-if="meta.spTotal">Total SP: {{ meta.spTotal }}</span>
      </div>
      <div v-if="weapons">Required Weapon: {{ weapons | join(', ') }}</div>
      <div v-if="altSkills">
        Alternatives:
        <span v-for="altSkill in altSkills" class="comma-separated">
          <template v-if="altSkill.id === activeAlt">
            <span>{{ messages[altSkill.name] }}</span>
          </template>
          <template v-else>
            <a href="javascript:;" @click="setActiveAlt(altSkill.id)">{{ messages[altSkill.name] }}</a>
          </template>
        </span>
      </div>
    </div>

    <div class="modal-block"  v-if="level < skill.maxLevel">
      <h6>Level Up Requirements</h6>
      <div v-if="next.levelReq">
        Character Level {{ next.levelReq }}
      </div>
      <div class="red" v-if="next.parents" v-for="parent in next.parents">
        <a href="javascript:;" @click="jumpToSkill(job.skills[parent.id])">{{ messages[job.skills[parent.id].name] }}</a> Lv. {{ parent.level }}
      </div>
      <div class="red" v-if="ascendancyReqs.length">
        <span v-for="req in ascendancyReqs">
          {{ job.ascendancies[req.ascendancy].name }} SP Total {{ req.sp }} or above
        </span>
      </div>
      <div :class="{ red: lackSp }" v-if="next.spCost">
        SP {{ next.spCost }}
      </div>
    </div>

    <div class="modal-block" v-if="description">
      <h6>Skill Description</h6>
      <div class="description" v-html="description"/>
    </div>

    <div class="modal-block" v-if="nextDescription">
      <h6>Next Description</h6>
      <div class="next-description" v-html="nextDescription"/>
    </div>

  </Modal>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import Modal from '../../Modal';

  export default {
    props: ['toggle', 'display'],

    computed: {
      ...mapState([
        'job',
        'build',
      ]),

      ...mapGetters([
        'active',
        'activeAlt',
        'level',
        'messages',
        'skill',
        'name',
        'meta',
        'techCount',
        'type',
        'attribute',
        'weapons',
        'next',
        'description',
        'nextDescription',
        'altSkills',
        'spTotals',
        'spTotal',
      ]),

      ascendancyReqs() {
        const spTotals = this.spTotals;
        const skill = this.skill;
        const reqs = [];

        skill.ascendancies.forEach((sp, ascendancy) => {
          if (spTotals[ascendancy] < sp) {
            reqs.push({ ascendancy, sp });
          }
        });

        return reqs;
      },

      lackSp() {
        const spTotals = this.spTotals;
        const spTotal = this.spTotal;
        const job = this.skill.job;
        const next = this.next;
        const ascendancies = this.job.ascendancies;
        const maxSp = this.job.sp;

        return spTotals[job] + next.spCost > ascendancies[job].sp
          || spTotal + next.spCost > maxSp;
      },

      levels() {
        return [
          0,
        ];
      },
    },

    methods: {
      ...mapActions([
        'setMode',
        'setActiveAlt',
      ]),
    },

    components: {
      Modal,
    },
  };
</script>

<style>
  .modal-block:not(:last-child) {
    padding-bottom: 1rem;
  }
</style>
