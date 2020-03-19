<template>
    <div>
        <h1>I want to gain these SKILLS</h1>
        <ul>
            <li v-for="skill in myWantedSkillToGain.SkillsToGain" :key="skill.id" >
                <router-link :to="{ name: 'PeopleOwnedSkillList', params: { skillId: skill.id, skillName: skill.name  }}"> {{ skill.name }} </router-link>                
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
        ...mapActions('skills',['getWantedSkillsByPersonId'])
    }
    
}
</script>