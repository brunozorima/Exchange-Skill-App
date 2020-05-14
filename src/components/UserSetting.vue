<template>
  <div class="container">
       <b-container class="bv-example-row">
            <b-row>
                <b-col>                   
                    <select v-model="Location">                         
                        <option disabled value="">Choose Location</option>
                        <option value="Birmingham">Birmingham</option>
                        <option value="Wolverhampton">Wolverhampton</option>
                        <option value="Coventry">Coventry</option>
                        <option value="Dudley">Dudley</option>
                    </select>
                </b-col>               
            </b-row>
            <hr>
            <b-row>
                <b-col>
                  <textarea v-model="Description" placeholder="About me...">                                         
                    </textarea>    
                </b-col>                             
            </b-row>
             <hr>
            <b-row>
                <b-col>
                    <textarea v-model="Education" placeholder="Education..."></textarea>                   
                </b-col>
            </b-row>
             <hr>
            <b-row>
                <b-col>                    
                     <textarea v-model="WorkExperience" placeholder="Work Experience..."></textarea>                   
                </b-col>
            </b-row>              
        </b-container>   
        <div>
            <b-button variant="success" @click="SaveUserSettings()">Save</b-button>
        </div> 
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    data(){
        return {
            Location: '',
            Description: '',
            Education:'',
            WorkExperience:'',
            selected:''
        }
    },
    created(){
        this.intial();
    },
    computed:{
        ...mapGetters('account', ['getUser']),
        
    },
    methods:{
        ...mapActions('users',['updateUser']),
        SaveUserSettings(){            
            this.getUser.location = this.Location
            this.getUser.Description = this.Description
            this.getUser.Education = this.Education
            this.getUser.WorkExperience = this.WorkExperience
            this.updateUser(this.getUser);
            alert("All Saved!")
        },
        intial(){
            this.Description = this.getUser.description;
            this.Education = this.getUser.education;
            this.WorkExperience = this.getUser.workExperience;
        }
    }
}
</script>

<style>

</style>