<template>
  <div class="col-lg-4">
    <Information/>
    <Techniques />
    <Crests />
    <RelatedSkills/>
  </div>
</template>

<script>
  import Information from './Information';
  import RelatedSkills from './RelatedSkills';
  import Crests from './Crests';
  import Techniques from './Techniques';

  export default {
    components: {
      Information,
      RelatedSkills,
      Crests,
      Techniques,
    },
  };
</script>
