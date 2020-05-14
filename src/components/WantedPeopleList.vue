//list of people that wants to gain this specific skills - the skills you have
<template>
    <div>
        <h1>People Seeking for: {{this.skillName}}</h1>
        <ul>
            <li v-for="person in wantedPeople.wantedPeople" :key="person.id">
                <router-link :to="{ name: 'UserProfile', params: { id: person.userDetails.id, userObj:person  }}"> {{person.userDetails.firstName}} </router-link>                
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {  
    props: ["skillId", "skillName"],
    mounted(){
        this.getWantedPersonBySkillId(this.skillId);
    },
    methods: {
        ...mapActions('skills', ['getWantedPersonBySkillId']),
    },
    computed: {
    ...mapState('skills', ['wantedPeople'])
    }    
}
</script>