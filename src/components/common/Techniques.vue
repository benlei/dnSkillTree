<template>
  <div class="techniques">
    <div class="d-flex justify-content-start">
      <div class="d-flex justify-content-end unselectable" v-if="skill.techs">
        <ul class="tech list-unstyled">
          <li v-for="tech in skill.techs" @click.prevent="maybeTech(tech.type, false)">
            <a href="javascript:;" class="fa"
               :class="{ 'fa-circle-thin': !isTeched(tech.type), 'fa-circle': isTeched(tech.type) }"
               @click.prevent
            />
            <a href="javascript:;" class="text-black" @click.prevent> {{ tech.type | typeName }}
              <template v-if="tech.type > 1">
                (Lv. {{ tech.level }})
              </template>
            </a>
          </li>
        </ul>
      </div>

      <div class="crest-tech unselectable ml-auto" @click.prevent="maybeTech(0, false)">
        <a href="javascript:;" class="fa"
           :class="{ 'fa-circle-thin': !isTeched(0), 'fa-circle': isTeched(0) }"
           @click.prevent
        /><a href="javascript:;" class="text-black" @click.prevent>{{ 0 | typeName }}</a>
      </div>
    </div>

    <div class="tech-alert alert alert-warning" v-if="warning && warningTech !== 10">
      <strong>{{ warningTech | typeName }}</strong>
      currently upgrades
      <strong>{{ warningSkill }}</strong>.

      Do you want to replace it?
      <br/>
      <a href="javascript:;" @click.prevent="maybeTech(warningTech, true)">Yes</a>
      /
      <a href="javascript:;" @click.prevent="clearWarning()">No</a>
    </div>

    <div class="tech-alert alert alert-warning" v-if="warning && warningTech === 10">
      <strong>{{ warningTech | typeName }} 1</strong>
      currently upgrades
      <strong>{{ warningSkill[0] }}</strong>.

      Do you want to replace it?
      <br/>
      <a href="javascript:;" @click.prevent="ringTech(build.techs[3], active)">Yes</a>
      /
      <a href="javascript:;" @click.prevent="clearWarning()">No</a>

      <br />
      <br />

      <strong>{{ warningTech | typeName }} 2</strong>
      currently upgrades
      <strong>{{ warningSkill[1] }}</strong>.

      Do you want to replace it?
      <br/>
      <a href="javascript:;" @click.prevent="ringTech(build.techs[4], active)">Yes</a>
      /
      <a href="javascript:;" @click.prevent="clearWarning()">No</a>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import techMixin from '../../mixins/techs';

  export default {
    mixins: [techMixin],

    data() {
      return {
        warning: false,
        warningSkill: 'Bash',
        warningTech: -1,
      };
    },

    watch: {
      active() {
        this.clearWarning();
      },
    },

    computed: {
      ...mapState([
        'build',
      ]),

      ...mapGetters([
        'active',
        'skill',
        'skills',
        'messages',
      ]),
    },

    methods: {
      ...mapActions([
        'toggleGearTech',
        'toggleCrestTech',
      ]),

      isTeched(tech) {
        const techs = this.build.techs;
        const skillId = this.active;

        switch (tech) {
          default:
            throw new Error(`Unknown tech: ${tech}`);
          case 0:
            return this.build.crestTech === skillId;
          case 1:
            return techs[0] === skillId;
          case 8:
            return techs[1] === skillId;
          case 9:
            return techs[2] === skillId;
          case 10:
            return techs[3] === skillId || techs[4] === skillId;

        }
      },

      maybeTech(tech, force) {
        const build = this.build;
        const crestTech = build.crestTech;
        const techs = build.techs;
        const skillId = this.active;

        let techIndex = 0;

        switch (tech) {
          default:
            throw new Error(`Unknown tech: ${tech}`);
          case 0:
            if (crestTech !== -1 && crestTech !== skillId && !force) {
              this.setWarning(crestTech, 0);
              return;
            }

            this.crestTech();
            return;
          case 9:
            techIndex += 1;

          // falls through
          case 8:
            techIndex += 1;

          // falls through
          case 1:
            if (techs[techIndex] !== -1 && techs[techIndex] !== skillId && !force) {
              this.setWarning(techs[techIndex], tech);
              return;
            }

            break;
          case 10:
            // both ring slots taken
            if (techs[3] !== -1 && techs[4] !== -1
              && techs[3] !== skillId && techs[4] !== skillId
              && !force) {
              this.setWarning([techs[3], techs[4]], tech);
              return;
            }

            break;
        }

        this.gearTech(tech, this.active);
      },

      gearTech(tech, skillId) {
        this.toggleGearTech({ skillId, tech });
        this.clearWarning();
      },

      crestTech() {
        this.toggleCrestTech(this.active);
        this.clearWarning();
      },

      ringTech(oldSkillId, newSkillId) {
        this.toggleGearTech({ skillId: oldSkillId, tech: 10 });
        this.toggleGearTech({ skillId: newSkillId, tech: 10 });
        this.clearWarning();
      },

      setWarning(skillId, tech) {
        this.warning = true;
        this.warningTech = tech;

        const messages = this.messages;
        const skills = this.skills;

        if (tech === 10) { // rings
          this.warningSkill = [
            messages[skills[skillId[0]].name],
            messages[skills[skillId[1]].name],
          ];
        } else {
          this.warningSkill = messages[skills[skillId].name];
        }
      },

      clearWarning() {
        this.warning = false;
      },
    },
  };

</script>


<style>
  .tech {
    list-style-type: none;
    padding-left: 0;
    margin-left: 3px;
    margin-bottom: 0;
  }

  .tech .fa, .crest-tech .fa {
    margin-right: 3px;
  }

  .fa span {
    font: inherit !important;
  }

  a.fa {
    color: inherit !important;
  }

  .text-black {
    color: #000 !important;
  }

  .tech-alert {
    margin-bottom: 0;
    margin-top: 1rem;
  }
</style>
