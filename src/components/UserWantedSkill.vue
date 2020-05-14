<template>
    <div>
        <h1>Seeking FOR:</h1>
        <ul v-if="myWantedSkillToGain.length > 0">
            <li v-for="(skills, index) in myWantedSkillToGain" :key="index + 'Y'">      
                <router-link :to="{ name: 'PeopleOwnedSkillList', params: { skillId: skills.id, skillName: skills.name  }}"> {{ skills.name }} </router-link> 
                <b-button variant="danger"  @click="RemoveWantSkill(skills, index)">Remove</b-button>
            </li>
        </ul> 
        <p v-else>No Need Skills Available!</p>
    </div>
</template>

<script>
 import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    mounted(){       
        this.getWantedSkillsByPersonId(this.loggedUserId);
    },
    computed: {
        ...mapGetters('account', ['loggedUserId']),
        ...mapState('skills', ['myWantedSkillToGain'])
    },
    methods: {
        ...mapActions('skills',['getWantedSkillsByPersonId','RemoveSkill']),
        //local methods
        RemoveWantSkill(skill, index){
            this.RemoveSkill({
                userId: this.loggedUserId,
                skillId:skill.id,
                index: index,
                type: 'need'
            });
        }  
    }
    
}
</script>