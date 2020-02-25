<template>
    <div>
        <select v-model.number="selected">  
            <option disabled value="">Select A Skill</option>  
            <option v-for="(option, index) in allSkills.skills" :key="index" :value="option.id">
                {{ option.name }}
            </option>
        </select>
        <br>
        <select v-model="picked">
        <option disabled value="">Select Skill Type</option>
            <option value="own">Own</option>
            <option value="wanted">Need</option>
        </select>
        <br>
        <button v-on:click="addNewSkill()">Add Skill</button>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {    
    data() {
        return {
            selected: '',
            picked:'',
            isDisabled: true
        }
    },
    mounted(){
        this.getAllSkills();
    },
    methods: {
        ...mapActions('skills', ['getAllSkills',  'addHasSkill', 'addUserWantSkill']),
        addNewSkill() {
            if(this.picked === 'own'){
                this.addHasSkill({
                person_id: this.loggedUserId,
                 id: this.selected })
            } else {
                this.addUserWantSkill({
                person_id: this.loggedUserId,
                 skill_id: this.selected })
            }            
        }
    },
    computed: {
        ...mapState('skills', ['allSkills']),
        ...mapGetters('account', ['loggedUserId'])        
    }
}
</script>