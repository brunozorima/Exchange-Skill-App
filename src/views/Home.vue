<template>
  <div class="home">
    <h1>Welcome To Skill Exchange</h1>
      <div class="container">
        <hr>
        <div class="row">
        <b-button pill variant="outline-secondary" @click="ResetFields">Reset</b-button>
          <select v-model="category" @change="filterByCategory($event)">
            <option disabled value="">Category</option>
              <option value="Cooking">Cooking</option>
              <option value="Computing">Computing</option>
              <option value="Consultant">Consultant</option>
              <option value="Creativity">Creativity</option>
              <option value="DIY">DIY</option>
              <option value="Dance">Dance</option>
              <option value="Education">Education</option>
              <option value="Health">Health / Care</option>
              <option value="Languages">Languages</option>
              <option value="Music">Music</option>
              <option value="Sport">Sport</option>
              <option value="Others">Others</option>
          </select>
            <select class="sel" v-model="location" @change="filterBylocation($event)">
                <option disabled value="">Choose Location</option>
                <option value="Birmingham">Birmingham</option>
                <option value="Wolverhampton">Wolverhampton</option>
                <option value="Coventry">Coventry</option>
                <option value="Dudley">Dudley</option>
            </select>
          <b-form-group >
            <b-form-radio-group
              v-model="selected"
              :options="options"
              name="radio-inline"
            ></b-form-radio-group>
        </b-form-group>
        </div>
        <hr>
        <br>
        <br>
            <div class="row" >
              <div class="col d-flex" v-for="(user, indexes) in filteredListOfUsers" :key="indexes + 'A'">
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
                    <br>
                    <span>Location: {{user.userDetails.location}}</span>
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
  data(){
    return {
      category:'',
      selected: '',
        options: [
          { text: 'Offering', value: 'first' },
          { text: 'Seeking', value: 'second' },
          { text: 'Both', value: 'third' }],
          location:'',
          filteredListOfUsers:[]
    }
  },
  computed: {
      ...mapState('users', ['allUsers'])
  },
  created () {
      this.getAllUsers();
      this.ResetFields();
  },
  methods: {
      ...mapActions('users', {
          getAllUsers: 'getAll'
      }),
      //local methods
      ResetFields(){
        this.filteredListOfUsers = this.allUsers;
        this.category =''
        this.selected =''
        this.location = ''
      },
      filterBylocation(location){
        this.filteredListOfUsers = this.allUsers.filter(user => user.userDetails.location === location.target.value)
      },
       filterByCategory(category){
        //  console.log(user.userHaveSkills.id)
        //  console.log(category.target.value)
        //  console.log(category)

        //  || user.userNeedSkills.category === Number(category.target.value
        // this.filteredListOfUsers = this.allUsers.filter(user => user.userHaveSkills.filter(skillCat => skillCat.id === 11))

          // this.allUsers.forEach(user => {
          //    user.userHaveSkills.filter(userSkill => userSkill.category === "Coventry")              
          // });
          // var s = []
        
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
