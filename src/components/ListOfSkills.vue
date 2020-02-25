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

        <!-- <input type="radio" id="own" value="own" v-model="picked">
        <label for="one">I Have This Skill</label>
        <br>
        <input type="radio" id="wanted" value="wanted" v-model="picked">
        <label for="two">I Need This Skill</label> -->

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