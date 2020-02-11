<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <hr>
    <h3>Hi, {{account.user.firstName}}!</h3>
    <hr>
    <ul v-if="users.items">
        <li v-for="user in users.items" :key="user.id">
            {{user.firstName + ' ' + user.lastName}}
            <span v-if="user.deleting"><em> - Deleting...</em></span>
            <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
            <span v-else> - <a @click="deleteUser(user.id)" class="text-danger">Delete</a></span>
        </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
      ...mapState({
          account: state => state.account,
          users: state => state.users.all
      })
  },
  created () {
      this.getAllUsers();
  },
  methods: {
      ...mapActions('users', {
          getAllUsers: 'getAll',
          deleteUser: 'delete'
      })
  },
  name: 'HelloWorld',
  props: {
    msg: String
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
