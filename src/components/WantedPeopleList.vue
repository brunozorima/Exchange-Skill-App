//list of people that wants to gain this specific skills - the skills you have
<template>
    <div>
        <h1>People Who Wants To Gain: {{this.skillName}}</h1>
        <ul>
            <li v-for="person in wantedPeople.wantedPeople" :key="person.id">
                <router-link :to="{ name: 'UserProfilePage', params: { id: person.id }}"> {{person.firstName}} </router-link>                
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