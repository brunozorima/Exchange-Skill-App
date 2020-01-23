<template>
    <div class="container" id="signup">
        <div class="card bg-light">
            <article class="card-body mx-auto" style="max-width: 400px;">
            <h4 class="card-title mt-3 text-center ">Login</h4>
            <form @submit.prevent="Login(user)">
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fas fa-envelope"></i> </span>
                </div>
                <input name="" class="form-control" placeholder="Email Address" type="email" v-model="user.email">
            </div> <!-- form-group// -->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fas fa-lock"></i> </span>
                </div>
                <input class="form-control" placeholder="Password" type="password" v-model="user.password">
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

export default {
    data() {
        return {
            user:
             {                
                email: '',
                password:''
            }
        }
    },
    methods: {     
        async Login (user) {
           let email = user.email 
            let password = user.password
            this.$store.dispatch('login', { email, password })
            .then(() => this.$router.push('/dashboard'))
            .catch(err => console.log(err))
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
</style>