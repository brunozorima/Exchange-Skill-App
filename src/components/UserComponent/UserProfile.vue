<template>
    <div>
       <div class="container">
            <div class="row">
                <div class="col">
                    <h3>User Details</h3>
                    <hr>
                    <h6>Name: {{userObj.userDetails.firstName}} {{userObj.userDetails.lastName}}</h6>
                    <h6>Location: {{userObj.userDetails.location}}</h6>
                    <hr>
                    <h6>About</h6>
                    <textarea v-model="Description" disabled></textarea>
                    <hr>
                    <h6>Education</h6>
                    <textarea v-model="Education" disabled></textarea>
                    <hr>
                    <hr>
                    <h6>Work Experience</h6>
                    <textarea v-model="workExperience" disabled></textarea>
                    <hr>
                </div>
                <div class="col">
                    <div class="col">
                        <h3>Have Skills</h3>                    
                        <hr>
                        <ul>
                            <li v-for="(skill, index) in userObj.userHaveSkills" :key="index + 'C'">{{skill.name}}</li>
                        </ul>
                    </div>
                    <div class="col">
                        <h3>Need Skills</h3>
                        <hr>
                        <ul>
                            <li v-for="(skillNeed, index) in userObj.userNeedSkills" :key="index + 'D'">{{skillNeed.name}}</li>
                        </ul>
                    </div> 
                </div>
                <div class="col">
                    <h3>Send Proposal</h3>
                    <hr>
                    <textarea v-model="MessageBody" placeholder="Write your message here"></textarea>
                    <br>
                    <button v-on:click="SendRequest()">Request Exchange</button>  
                </div>
                               
            </div>           
                      
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
    props:["userObj"],
    data(){
        return {    
            MessageBody:'',
            Description:this.userObj.userDetails.description,
            Education:this.userObj.userDetails.education,
            workExperience:this.userObj.userDetails.workExperience
        }
    },
    computed: {      
        ...mapGetters('account', ['loggedUserId'])
    },
    methods: {
        ...mapActions('exchange',['RequestExchange']), 
        //local methods
        SendRequest(){
            if (this.MessageBody.length === 0) {
                alert("Please enter a message")
                return;
            }
            var exchangeRequest = {
                Sender_Id: this.loggedUserId,
                Recipient_Id: Number(this.userObj.userDetails.id),
                Opened_TimeStamp: new Date().toISOString(),
                Last_Message_TimeStamp: new Date().toISOString(),
                Status: 0
                };

            var message = {
                Sender_Id: this.loggedUserId,
                Exchange_Id: 0,
                Body: this.MessageBody,
                TimeStamp: new Date().toISOString()
                };
            this.RequestExchange({exchangeRequest, message}) 
        }
    }
}
</script>