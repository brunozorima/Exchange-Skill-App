<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <router-link class="navbar-brand" to="/">Skill Exchange</router-link>
            <button class="navbar-toggler" type="button" 
                data-toggle="collapse" 
                data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>     
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/">Home</router-link> <span class="sr-only">(current)</span>
                </li>
                <li class="nav-item active">
                    <router-link class="nav-link" v-if="isLoggedIn" to="/dashboard">Dashboard </router-link>  <span class="sr-only">(current)</span>
                </li>          
                <li class="nav-item active">            
                    <router-link class="nav-link" v-if="!isLoggedIn" to="/login">Login</router-link>  <span class="sr-only">(current)</span>
                </li>
                <li class="nav-item active">
                    <router-link class="nav-link" v-if="!isLoggedIn" to="/signup">Register</router-link>  <span class="sr-only">(current)</span>
                </li>
                <li class="nav-item active">
                    <router-link class="nav-link" to="/about">About</router-link>  <span class="sr-only">(current)</span>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" v-if="isLoggedIn" to="/login">Logout</router-link>  <span class="sr-only">(current)</span>
                </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search ..." aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
        <b-container>
    <!-- allow the system to re-route without refreshing the page -->
        <router-view/>
        </b-container>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
      computed : {    
         ...mapState({
            account: state => state.account            
        }),
        //returns true if the user is logged in else false 
        isLoggedIn : function(){ return this.account.status.loggedIn}  
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