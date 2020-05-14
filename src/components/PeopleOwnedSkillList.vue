//list of people that OWNS this specific skills - the skills they have and they can teach me
<template>
    <div>
        <h1>People offfering: {{this.skillName}}</h1>
        <ul>
            <li v-for="person in OwnedSkillByPeople.skillOwned" :key="person.id">
                <router-link :to="{ name: 'UserProfile', params: { id: person.userDetails.id, userObj:person }}"> {{person.userDetails.firstName}} </router-link>                
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {  
    props: ["skillId", "skillName"],
    mounted(){
        this.getPeopleOwnedSkillsBySkillId(this.skillId);
    },
    methods: {
        ...mapActions('skills', ['getPeopleOwnedSkillsBySkillId']),
    },
    computed: {
    ...mapState('skills', ['OwnedSkillByPeople'])
    }    
}
</script>