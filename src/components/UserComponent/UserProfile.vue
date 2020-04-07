<template>
    <div>
       <div class="container">
            <div class="row">
                <div class="col">
                    <h3>User Details</h3>
                    <hr>
                    <h6>Name: {{userObj.userDetails.firstName}}</h6>
                </div>
                <div class="col">
                    <h3>Have Skills</h3>                    
                    <hr>
                    <ul>
                        <li v-for="(skill, index) in userObj.userHaveSkills" :key="index + 'C'">{{skill.name}}</li>
                    </ul>
                </div>
                <div class="col">
                    <h3>Need Skills</h3>
                    <hr>
                    <ul>
                        <li v-for="(skillNeed, index) in userObj.userNeedSkills" :key="index + 'D'">{{skillNeed.name}}</li>
                    </ul>
                </div>                
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
    props:["userObj"]
    // mounted(){       
    //     this.getUserById(this.id);
    // },
    // computed: {
    //     ...mapState('users' , ['user'])
    // },
    // methods: {
    //     ...mapActions('users',['getUserById'])
    // }
}
</script>