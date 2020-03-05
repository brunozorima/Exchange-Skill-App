<template>
  <div class="hello">
    <hr>
    <h3>{{user.firstName}} {{user.lastName}}</h3>
    <hr>
    <textarea v-model="MessageBody" placeholder="Write your message here"></textarea>
    <br>
    <button v-on:click="SendRequest()">Request Exchange</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  props:["id"],
  data(){
    return {    
      MessageBody:''
    }
  },
  computed: {
      ...mapState({
          user: state => state.users.user
      }),
      ...mapGetters('account', ['loggedUserId'])
  },
  created () {
      this.getUserData(this.id);
  },
  methods: {
    ...mapActions('exchange',['RequestExchange']),
    ...mapActions('users', {
          getUserData: 'getUserById'
      }),
      //local methods
      SendRequest(){
        var exchangeRequest = {
              Sender_Id: this.loggedUserId,
              Recipient_Id: Number(this.id),
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
