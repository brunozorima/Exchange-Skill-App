<template>
  <div id="app">
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
            <a class="nav-link"  v-if="isLoggedIn" @click="logout">Logout</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Learn to dance or coding..." aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    <!-- allow the system to re-route without refreshing the page -->
    <router-view/>
  </div>
</template>
<script>
  export default {
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}      
    },
    created: function () {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch(logout)
          }
          throw err;
        });
      });
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
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
