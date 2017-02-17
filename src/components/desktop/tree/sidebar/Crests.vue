<template>
  <div class="card" v-if="crests[active]">
    <div class="card-header active">
      Crest
    </div>
    <div class="card-block row">
      <div class="col-md-2 my-auto">
        <a href="javascript:;" class="fa fa-chevron-left"
           v-if="crest !== -1"
           @click.prevent="setCrest(crest - 1)"
        />
      </div>
      <div class="col-md-8 text-center" v-html="crestDescription">
      </div>
      <div class="col-md-2 text-right my-auto">
        <a href="javascript:;" class="fa fa-chevron-right"
           v-if="crestCount < 7 && crest !== (crests[active].length - 1)"
           @click.prevent="setCrest(crest + 1)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import parameterize from '../../../../lib/parameterize';
  import crestsMixin from '../../../../mixins/crests';

  export default {
    mixins: [crestsMixin],

    computed: {
      ...mapGetters([
        'crestDescription',
        'messages',
      ]),

      crestDescription() {
        const messages = this.messages;
        const crests = this.crests;
        const index = this.crest;
        const crestCount = this.crestCount;

        if (index === -1) {
          return crestCount === 7 ? 'Skill Crest Limit Reached' : 'None';
        }

        const crest = crests[this.active][index];
        return parameterize(messages[crest.description], crest.params, messages);
      },
    },
  };
</script>
