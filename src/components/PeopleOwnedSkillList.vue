//list of people that OWNS this specific skills - the skills they have and they can teach me
<template>
    <div>
        <h1>People Who OWNS This Skill: {{this.skillId}}</h1>
        <ul>
            <li v-for="person in OwnedSkillByPeople.skillOwned" :key="person.id">
                {{person.lastName}} 
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {  
    props: ["skillId"],
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