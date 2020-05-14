<template>
  <div id="app">
    <AppHeader></AppHeader>   
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import AppHeader from '../src/views/AppHeader';

  export default {
    components: {
      AppHeader
    },
    created: function () {
      this.logout();
      // this.$http.interceptors.response.use(undefined, function (err) {
      //   return new Promise(function (resolve, reject) {
      //     if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      //       this.logout()
      //     }
      //     throw err;
      //   });
      // });
    },
    methods:{
       ...mapActions('account', ['logout'])
    }
  }
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
