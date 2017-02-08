<template>
  <div class="card" v-if="crests[active]">
    <div class="card-header active">
      Crest
    </div>
    <div class="card-block row">
      <div class="col-md-2 my-auto">
        <i class="fa fa-chevron-left"
           v-if="crest !== -1"
           @click="setCrest(crest - 1)"
        />
      </div>
      <div class="col-md-8 text-center" v-html="crestDescription">
      </div>
      <div class="col-md-2 text-right my-auto">
        <i class="fa fa-chevron-right"
           v-if="crestCount < 7 && crest !== (crests[active].length - 1)"
           @click="setCrest(crest + 1)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapState([
        'build',
      ]),
      ...mapGetters([
        'active',
        'skill',
        'crests',
        'crest',
        'crestDescription',
        'crestCount',
      ]),
    },

    methods: {
      ...mapActions([
        'setSkillCrest',
        'removeSkillCrest',
      ]),

      setCrest(index) {
        if (index === -1) {
          this.removeSkillCrest(this.active);
        } else {
          this.setSkillCrest({ skillId: this.active, index });
        }
      },
    },
  };
</script>
