<template>
  <div class="home">
    <h1>All users</h1>
    <b-table hover :fields="fields" :items="users" >
     <template v-slot:cell(user)="users">
       <router-link :to="`user/${users.item.id}`">{{ users.item.id }}</router-link>      
      </template>
    </b-table>    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      fields: [ 
        {
          // A column that needs custom formatting,
            // calling formatter 'fullName' in this app
            key: 'user',
            label: 'Id',
            formatter: 'getId'
        },
        'firstName', 
        'lastName', 
        'email'
        ]
    }
  },
  computed: {
      ...mapState({
          users: state => state.users.all.items
      })
  },
  created () { 
      this.getAllUsers();
  },
  methods: {
      ...mapActions('users', {
          getAllUsers: 'getAll',
          deleteUser: 'delete'
      }),
      getId(value){
        return `${value}`
      }
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
