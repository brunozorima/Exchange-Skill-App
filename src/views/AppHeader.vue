<template>
    <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand>
        <router-link class="navbar-brand" to="/">Skill Exchange</router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>


    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="nav-item active">
            <b-nav-item class="nav-link active" to="/"> Home</b-nav-item>            
            <b-nav-item class="nav-link active" v-if="isLoggedIn" to="/dashboard"> Dashboard</b-nav-item>            
            <b-nav-item class="nav-link active" v-if="!isLoggedIn" to="/login"> Login</b-nav-item>            
            <b-nav-item class="nav-link active" v-if="!isLoggedIn" to="/signup"> Register</b-nav-item> 
            <b-dropdown id="dropdown-left"  
            text="Skill Type" 
            variant="info" 
            class="m-2"  
            >
              <b-dropdown-item 
              v-for="(option, indexSkill) in allSkills.skills" :key="indexSkill + 'E'" :value="option.id"
              >{{option.name}}
              </b-dropdown-item>
            </b-dropdown>
            <b-dropdown id="dropdown-right" v-if="isLoggedIn" right text="Skill Goal" variant="info" class="m-2">
              <b-dropdown-item href="#">Need</b-dropdown-item>
              <b-dropdown-item href="#">Want</b-dropdown-item>
              <b-dropdown-item href="#">Auto Matching</b-dropdown-item>
            </b-dropdown>
            <b-nav-item class="nav-link active" to="/about"> About</b-nav-item>    
            <b-nav-item class="nav-link active" v-if="isLoggedIn" to="/login"> Logout</b-nav-item>            
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form @submit.stop.prevent="onSubmit" class="form-inline my-2 my-lg-0">           
            <b-form-input class="form-control mr-sm-2" placeholder="Search..." aria-label="Search">
            </b-form-input>
            <b-button class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
        <b-container>
    <!-- allow the system to re-route without refreshing the page -->
        <router-view/>
        </b-container>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  mounted(){
    this.getAllSkills();
  },
  computed : {    
    //returns true if the user is logged in else false 
    // isLoggedIn : function(){ return this.account.status.loggedIn}  
    ...mapState('account',['isLoggedIn']),
    ...mapState('skills', ['allSkills']),

  },
  methods: {
      ...mapActions('skills', ['getAllSkills']),
      ...mapActions('account', ['account']),
      onSubmit(){

      } 
  }
}
</script>

<style lang="less">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>