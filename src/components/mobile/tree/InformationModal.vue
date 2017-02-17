<template>
  <Modal :title="name" :toggle="toggle" :display="display">
    <div class="modal-block">
      <div class="d-flex justify-content-between tech mode">
        <div>
          <i class="fa"
             :class="{ 'fa-circle-thin': build.mode, 'fa-circle': !build.mode }"
             @click="setMode(0)"
          /> PvE
        </div>

        <div class="float-right">
          <i class="fa"
             :class="{ 'fa-circle-thin': !build.mode, 'fa-circle': build.mode }"
             @click="setMode(1)"
          /> PvP
        </div>
      </div>

      <h6>Level</h6>

      <div class="form-group">
        <select class="form-control" v-model="levelSelected">
          <option v-for="lvl in levels" :disabled="lvl < 0" :value="Math.abs(lvl)">
            Lv. {{ Math.abs(lvl) }}{{ techCount? ' +' + techCount : null}}
          </option>
        </select>
      </div>
    </div>

    <div class="modal-block" v-if="crests[active]">
      <h6>Crests</h6>
      <template v-if="crestCount === 7">
        <div>Cannot equip more than 7 crests.</div>
      </template>
      <template v-else>
        <div class="form-group">
          <select class="form-control" v-model="crestSelected">
            <option value="-1">None</option>
            <option v-for="(crest, crestIndex) in crests[active]" :value="crestIndex"
                    v-html="crestDescription(crestIndex)"/>
          </select>
        </div>
      </template>
    </div>

    <div class="modal-block" v-if="skill.techs">
      <h6>Techniques</h6>
      <Techniques/>
    </div>

    <div class="modal-block">
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

    <div class="modal-block" v-if="showLevelUpReq">
      <h6>Level Up Requirements</h6>
      <div v-if="next.levelReq">
        Character Level {{ next.levelReq }}
      </div>
      <div class="red" v-if="next.parents" v-for="parent in next.parents">
        <a href="javascript:;" @click="jumpToSkill(job.skills[parent.id]); toggle()">{{ messages[job.skills[parent.id].name]
          }}</a> Lv. {{ parent.level }}
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
  import { mapActions } from 'vuex';
  import Modal from '../../Modal';
  import Techniques from '../../common/Techniques';
  import Level from '../../../lib/level';
  import informationMixin from '../../../mixins/information';
  import techsMixin from '../../../mixins/techs';
  import crestsMixin from '../../../mixins/crests';
  import parameterize from '../../../lib/parameterize';

  export default {
    mixins: [informationMixin, techsMixin, crestsMixin],

    props: ['toggle', 'display'],

    data() {
      return {
        levelSelected: -1,
        crestSelected: -1,
      };
    },

    beforeMount() {
      this.levelSelected = this.level;
      this.crestSelected = this.crest;
    },

    watch: {
      levelSelected(newVal) {
        if (newVal !== this.level) {
          this.setLevel({
            skillId: this.skill.id,
            level: newVal,
          });
        }
      },

      crestSelected(newVal) {
        if (newVal !== this.crest) {
          this.crestSelected = newVal;
          this.setCrest(newVal);
        }
      },

      level(newVal) {
        this.levelSelected = newVal;
      },

      crest(newVal) {
        this.crestSelected = newVal;
      },
    },

    computed: {
      levels() {
        const skill = this.skill;
        const level = this.level;
        const jobSpTotal = this.spTotals[skill.job];
        const spTotal = this.spTotal;
        const job = this.job;
        const ascendancyMaxSp = job.ascendancies[skill.job].sp;
        const maxSp = job.sp;
        const levels = [];

        if (skill.levelReq[0] !== 1) {
          levels.push(0);
        }

        const nowSp = !level ? 0 : skill.spTotal[Level.indexOf(level)];
        let multi = 1;

        for (let i = 1; i <= this.meta.maxLevel; i += 1) {
          if (i > this.level && multi > 0) {
            const index = Level.indexOf(i);
            const nextSp = skill.spTotal[index];
            const diff = nextSp - nowSp;
            if (jobSpTotal + diff > ascendancyMaxSp
              || spTotal + diff > maxSp
              || skill.levelReq[index] > process.env.LEVEL_CAP) {
              multi = -1;
            }
          }

          levels.push(i * multi);
        }

        return levels;
      },
    },

    methods: {
      ...mapActions([
        'setLevel',
      ]),

      crestDescription(index) {
        const messages = this.messages;
        const crests = this.crests;
        const crest = crests[this.active][index];

        return parameterize(messages[crest.description], crest.params, messages);
      },
    },

    components: {
      Modal,
      Techniques,
    },
  };
</script>

<style>
  .modal-block:not(:last-child) {
    padding-bottom: 1rem;
  }

  .modal-block .form-group {
    margin-bottom: .5rem;
  }

  .mode {
    margin-bottom: .5rem;
  }
</style>
