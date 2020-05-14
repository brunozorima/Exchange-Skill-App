<template>
    <div class="container" id="signup">
        <div class="card bg-light">
            <article class="card-body mx-auto" style="max-width: 400px;">
            <h4 class="card-title mt-3 text-center ">Login</h4>
            <form @submit.prevent="handleSubmit">
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fas fa-envelope"></i> </span>
                </div>
                <input name="" class="form-control" placeholder="Email Address" type="email" v-model="username">
            </div> <!-- form-group// -->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fas fa-lock"></i> </span>
                </div>
                <input class="form-control" placeholder="Password" type="password" v-model="password">
            </div> <!-- form-group// -->
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block"> Login </button>
            </div> <!-- form-group// -->      
            <p class="text-center">No Account? <router-link to="/signup">Sign up</router-link>  </p>                                                                 
        </form>
        </article>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            username: '',
            password:'',
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        handleSubmit (e) {
            this.submitted = true;
            const { username, password } = this;
            if (username && password) {
                this.login({ username, password })
            }
        }
    } 
}
</script>
<style scoped>
.btn-facebook {
    background-color: #405D9D;
    color: #fff;
}
.btn-twitter {
    background-color: #42AEEC;
    color: #fff;
}
.divider-text {
    position: relative;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
}
.divider-text span {
    padding: 7px;
    font-size: 12px;
    position: relative;   
    z-index: 2;
}
.divider-text:after {
    content: "";
    position: absolute;
    width: 100%;
    border-bottom: 1px solid #ddd;
    top: 55%;
    left: 0;
    z-index: 1;
}
.button{
  color:white;
  min-width: 150px;
  background-color: #000000a1;
  height: 2.5rem;
  border-radius: 2rem;
  font-weight: 400;
  font-size: 0.8rem;
}
</style>