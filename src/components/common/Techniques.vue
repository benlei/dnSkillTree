<template>
  <div class="techniques">
    <div class="d-flex justify-content-between">
      <div class="d-inline unselectable">
        <ul class="tech">
          <li v-for="tech in skill.techs" @click.prevent="maybeTech(tech, false)">
            <a href="javascript:;" class="fa"
               :class="{ 'fa-circle-thin': !isTeched(tech), 'fa-circle': isTeched(tech) }"
               @click.prevent
            /><a href="javascript:;" class="text-black" @click.prevent> {{ tech | techName }}</a>
          </li>
        </ul>
      </div>

      <div class="crest-tech unselectable" @click.prevent="maybeTech(tech, false)">
        <a href="javascript:;" class="fa"
           :class="{ 'fa-circle-thin': !isTeched(0), 'fa-circle': isTeched(0) }"
           @click.prevent
        /><a href="javascript:;" class="text-black" @click.prevent>Crest</a>
      </div>
    </div>

    <div class="tech-alert alert alert-warning" v-if="warning">
      <strong>{{ warningTech | techName }}</strong> currently upgrades <strong>{{ warningSkill }}</strong>.
      Are you sure you want to replace it?
      <a href="javascript:;" @click.prevent="maybeTech(warningTech, true)">Yes</a>
      /
      <a href="javascript:;" @click.prevent="clearWarning()">No</a>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';

  export default {
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
              this.setWarning(techs[4], tech);
              return;
            }

            break;
        }

        this.gearTech(tech);
      },

      gearTech(tech) {
        this.toggleGearTech({ skillId: this.active, tech });
        this.clearWarning();
      },

      crestTech() {
        this.toggleCrestTech(this.active);
        this.clearWarning();
      },

      setWarning(skillId, tech) {
        this.warning = true;
        this.warningSkill = this.messages[this.skills[skillId].name];
        this.warningTech = tech;
      },

      clearWarning() {
        this.warning = false;
      },
    },

    filters: {
      techName(num) {
        switch (num) {
          default:
            return 'Crest';
          case 1:
            return 'Weapon';
          case 8:
            return 'Necklace';
          case 9:
            return 'Earring';
          case 10:
            return 'Ring';
        }
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
