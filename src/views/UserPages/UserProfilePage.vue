<template>
  <div class="hello">
    <hr>
    <h3>{{user.firstName}} {{user.lastName}}</h3>
    <hr>
    <textarea v-model="message" placeholder="Write your message here"></textarea>
    <br>
    <button>Request Exchange</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props:["id"],
  data(){
    return {
      message:''
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
