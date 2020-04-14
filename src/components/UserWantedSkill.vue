<template>
    <div>
        <h1>I want to gain these SKILLS</h1>
         <div class="text-center" v-if="!Array.isArray(myWantedSkillToGain) || !myWantedSkillToGain.length">
             <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div>
        <ul v-else>
            <li v-for="(skills, index) in myWantedSkillToGain" :key="index + 'Y'">              
                <router-link :to="{ name: 'PeopleOwnedSkillList', params: { skillId: skills.id, skillName: skills.name  }}"> {{ skills.name }} </router-link> 
                <b-button variant="danger"  @click="RemoveWantSkill(skills, index)">Remove</b-button>
            </li>
        </ul>       
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