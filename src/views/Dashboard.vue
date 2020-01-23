<template>
  <div>
      <h1>Welcome to Dashboard Page </h1>
  </div>
</template>
<script>
  export default {
    computed : {
      isStatus: function(){ return this.$store.getters.test}      
    }
  }
</script>