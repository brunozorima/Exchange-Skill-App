<template>
  <div>
    <h1>Welcome To Dashboard, {{account.user.firstName}}!</h1>
    <hr>
    <table border="1" align="center">
      <tr>
        <th>Id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
      </tr>
      <tr>
        <td>{{account.user.id}}</td>
        <td>{{account.user.firstName}}</td>
        <td>{{account.user.lastName}}</td>
        <td>{{account.user.email}}</td>
      </tr> 
    </table>
    <hr>
  </div>
</template>
<script>
 import { mapState, mapActions } from 'vuex'

  export default {
    computed : {
         ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    }
  }
</script>