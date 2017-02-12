<template>
  <div class="card" v-if="skill.techs">
    <div class="card-header active">
      Techniques
    </div>
    <div class="card-block">
      <div class="d-flex justify-content-between">
        <div class="d-inline unselectable">
          <span class="tech" v-for="tech in skill.techs">
            <a href="javascript:;" class="fa"
               :class="{ 'fa-circle-o': !isTeched(tech), 'fa-check-circle-o': isTeched(tech) }"
               @click="gearTech(tech)"
            /> {{ tech | techName }}
          </span>
        </div>

        <div class="crestTech unselectable">
          <a href="javascript:;" class="fa"
             :class="{ 'fa-circle-o': !isTeched(0), 'fa-check-circle-o': isTeched(0) }"
             @click="crestTech"
          /> Crest
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapState([
        'build',
      ]),
      ...mapGetters([
        'active',
        'skill',
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

      gearTech(tech) {
        this.toggleGearTech({ skillId: this.active, tech });
      },

      crestTech() {
        this.toggleCrestTech(this.active);
      },
    },

    filters: {
      join: (arr, separator) => arr.join(separator),
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

<style scoped>
  .card .card-block + .card-block {
    padding-top: 0;
  }
</style>

<style>
  .tech {
    margin-right: 1.25rem;
  }

  a.fa {
    color: inherit !important;
  }
</style>
