<template>
    <div>
        <h1>I have this SKILLS</h1>
        <ul>
            <li v-for="skill in myHasSkill.skill" :key="skill.id" >
                <router-link :to="{ name: 'WantedPeopleList', params: { skillId: skill.id, skillName: skill.name }}"> {{ skill.name }} </router-link>                
            </li>
        </ul>
    </div>
</template>

<script>
 import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    mounted(){       
        this.GetPersonHasSkillById(this.loggedUserId);
    },
    computed: {
        ...mapGetters('account', ['loggedUserId']),
        ...mapState('skills', ['myHasSkill']),

    },
    methods: {
        ...mapActions('skills',['GetPersonHasSkillById'])
    }
    
}
</script>