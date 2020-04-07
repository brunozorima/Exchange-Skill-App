<template>
  <div class="home">
    <h1>Welcome To Skill Exchange</h1>
      <div class="container">
        <hr>
            <div class="row" >
              <div class="col d-flex" v-for="(user, indexes) in users" :key="indexes + 'A'">
                <b-card
                  :title="user.userDetails.firstName + ' ' +user.userDetails.lastName"
                  img-src="https://picsum.photos/600/300/?image=26"
                  img-alt="Image"
                  img-top
                  tag="article"
                  style="max-width: 20rem;"
                  class="mb-2"
                >
                <hr>
                  <b-card-text class="left-align ">
                    <span v-for="(skillHave, index) in user.userHaveSkills" :key="index + 'A'">Offer: {{ skillHave.name }}</span>
                    <br>
                    <span v-for="(skill, index) in user.userNeedSkills" :key="index + 'B'">Want: {{ skill.name }}</span>
                  </b-card-text>               
                  <router-link :to="{ name: 'UserProfile', params: { id: user.userDetails.id, userObj:user }}">
                        <b-button variant="success">View Profile </b-button>
                  </router-link> 
                </b-card>
              </div>
            </div>
        </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
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
          getAllUsers: 'getAll'
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
