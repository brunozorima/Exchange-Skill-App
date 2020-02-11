<template>
  <div class="hello">
    <hr>
    <h3>{{$route.params.id}}</h3>
    <hr>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return{
      id: 0
    }
  },
  computed: {
      ...mapState({
          user: state => state.users.user
      })
  },
  created () {
      this.getUserData(this.id);
  },
  methods: {
      ...mapActions('users', {
          getUserData: 'getUserById'
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
