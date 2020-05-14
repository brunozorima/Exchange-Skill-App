<template>
    <div>
        <h1>Offering</h1>
         <!-- <div class="text-center" v-if="!Array.isArray(myHasSkill) || !myHasSkill.length">
             <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div> -->
        <ul v-if="myHasSkill.length > 0">
            <li v-for="(skill, index) in myHasSkill" :key="index + 'Z'" >
                <router-link :to="{ name: 'WantedPeopleList', params: { skillId: skill.id, skillName: skill.name }}"> {{ skill.name }} </router-link>   
                <b-button variant="danger"  @click="RemoveOwnSkill(skill, index)">Remove</b-button>
            </li>
        </ul>
        <p v-else>No Owned Skills Available!</p>
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
        ...mapState('skills', ['myHasSkill'])
    },
    methods: {
        ...mapActions('skills',['GetPersonHasSkillById','RemoveSkill']),
        //local methods
        RemoveOwnSkill(skill, index){
            this.RemoveSkill({
                userId: this.loggedUserId,
                skillId:skill.id,
                index: index,
                type: 'own'
            });
        }   
    }
}
</script>