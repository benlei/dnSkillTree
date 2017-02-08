<template>
  <div class="col-md-4">
    <div class="card description">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item text-center">
            <a class="nav-link" v-on:click="mode = 0" :class="{active: !mode}" href="javascript:;">PvE</a>
          </li>
          <li class="nav-item text-center">
            <a class="nav-link" v-on:click="mode = 1" :class="{active: mode}" href="javascript:;">PvP</a>
          </li>
        </ul>
      </div>
      <div class="card-block">
        <h5>Super Serious Punch</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <p class="card-text">Mode: {{ mode }}</p>
        <p class="card-text">Also: Alternative 1, Alternative 2</p>
      </div>
    </div>

    <div class="card">
      <div class="card-header build">
        Related Skills
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Skill A</li>
        <li class="list-group-item">Skill B</li>
        <li class="list-group-item">Skill C</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mode: 0,
      };
    },
  };
</script>

<style>
  .description .card-header {
    background: #02151D;
    color: #fff;
  }

  .description .nav-link {
    color: #FFF;
  }

  .description .nav-item {
    width: 50%;
  }

  .description .nav-item a {
    border: 0;
  }

  .alternative-skills {
    margin-bottom: 10px;
  }
</style>
