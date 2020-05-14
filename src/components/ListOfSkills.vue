<template>
    <div>
        <h2>Addding New Skill</h2>
        <hr>
        <select v-model="category" @change="SelectOnChange($event)">
            <option disabled value="">Category</option>
            <option value="0">Cooking</option>
            <option value="1">Computing</option>
            <option value="2">Consultant</option>
            <option value="3">Creativity</option>
            <option value="4">DIY</option>
            <option value="5">Dance</option>
            <option value="6">Education</option>
            <option value="7">Health / Care</option>
            <option value="8">Languages</option>
            <option value="9">Music</option>
            <option value="10">Sport</option>
            <option value="11">Others</option>
        </select> 
        <select v-model.number="selected">
            <option disabled value="">what's your goal...</option>
            <option v-for="(option, index) in FilteredListOfSkill" :key="index" :value="option.id">
                {{ option.name }}
            </option>
        </select>
        <br>
        <select v-model="picked">
        <option disabled value="">Offering or Seeking</option>
            <option value="Offering">Offering</option>
            <option value="Seeking">Seeking</option>
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
            category:'',
            isDisabled: true,
            FilteredListOfSkill:[]                      
        }
    },
    mounted(){
        this.getAllSkills();
    },
    methods: {
        ...mapActions('skills', ['getAllSkills',  'addHasSkill', 'addUserWantSkill', 'createSkill']),
        addNewSkill() {
            if(this.picked === 'Offering'){
                this.addHasSkill({
                person_id: this.loggedUserId,
                 id: this.selected })
            } else {
                this.addUserWantSkill({
                person_id: this.loggedUserId,
                 skill_id: this.selected })
            }
            this.selected =''
            this.picked = ''
            this.category =''
            alert("Skill Added!")
        },
        SelectOnChange(event){            
            this.FilteredListOfSkill = this.allSkills.skills.filter(skill => skill.category === Number(event.target.value))            
        }
        // create_Skill(){       
        //     this.createSkill({Id: 0, Name:this.Title, Category: this.category, Type:this.picked, BelongsTo: this.loggedUserId})
        //     this.Title ='',
        //     this.selected ='',
        //     this.category=''
        // }
    },
    computed: {
        ...mapState('skills', ['allSkills']),
        ...mapGetters('account', ['loggedUserId']),
        
    }
}
</script>