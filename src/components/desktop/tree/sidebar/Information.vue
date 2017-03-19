<template>
  <div class="card information">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item text-center">
          <a class="nav-link" @click="setMode(0)" :class="{active: !build.mode}"
             href="javascript:;">PvE</a>
        </li>
        <li class="nav-item text-center">
          <a class="nav-link" @click="setMode(1)" :class="{active: build.mode}" href="javascript:;">PvP</a>
        </li>
      </ul>
    </div>

    <div class="card-block">
      <h5>{{ name }}</h5>
      <div>
        <span>Level: {{ meta.level }}{{ techCount? ' +' + techCount : null}}</span>
        <span class="float-right">Max Level: {{ meta.maxLevel }}</span>
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
            <a href="javascript:;"
               @click="setActiveAlt(altSkill.id)">{{ messages[altSkill.name] }}</a>
          </template>
        </span>
      </div>
    </div>

    <div class="card-block" v-if="showLevelUpReq">
      <h6>Level Up Requirements</h6>
      <div v-if="next.levelReq">
        Character Level {{ next.levelReq }}
      </div>
      <div class="red" v-if="next.parents" v-for="parent in next.parents">
        <a href="javascript:;" @click="jumpToSkill(job.skills[parent.id])">
          {{ skillName(parent.id) }}
        </a> Lv. {{ parent.level }}
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

    <div class="card-block" v-if="description">
      <h6>Skill Description</h6>
      <div class="description" v-html="description"/>
    </div>

    <div class="card-block" v-if="nextDescription">
      <h6 v-if="level < softMaxLevel">Next Level</h6>
      <h6 v-else>+1 Item Effect</h6>
      <div v-html="nextDescription"/>
    </div>
  </div>
</template>

<script>
  import informationMixin from '../../../../mixins/information';

  export default {
    mixins: [informationMixin],
  };
</script>

<style>
  .card .card-block + .card-block {
    padding-top: 0;
  }

  .information .card-header {
    background: #02151D;
    color: #fff;
  }

  .information .nav-link {
    color: #FFF;
  }

  .information .nav-item {
    width: 50%;
  }

  .information .nav-item a {
    border: 0;
  }

  .card-block {
    font-size: 80%;
  }

  span.o {
    color: #bf8100;
  }

  span.y {
    color: #888800;
  }

  span.p {
    color: #8a8166;
  }

  span.r {
    color: #a82121;
  }

  span.s {
    color: #699fb3;
  }

  span.v {
    color: #904f90;
  }

  .comma-separated + .comma-separated:before {
    content: ", ";
  }

  .red {
    color: #8b0000;
  }
</style>
