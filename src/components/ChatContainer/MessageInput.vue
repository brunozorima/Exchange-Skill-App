<template>
  <div class="message-input">
    <textarea
      v-model="messageBody"
      ref="messageInput"
      placeholder="message..."
      maxlength="20000"
      @keydown.enter="submitMessage"
    ></textarea>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  props:["exchange_id"],
  name: 'message-input',
  data() {
    return {
        messageBody: ''
    }
  },
  computed: {     
      ...mapGetters('account', ['loggedUserId'])
  },
  methods: {
    ...mapActions('exchange',['SendMessage']),
    submitMessage(event) {

      if (!event.shiftKey) {
        event.preventDefault();
      } else {
        return;
      }
      // If the message body is empty, do not submit
      if (event.target.value.length === 0) {
        return;
      }

     var message = {
        Sender_Id: this.loggedUserId,
        Exchange_Id: this.exchange_id,
        Body: this.messageBody,
        TimeStamp: new Date().toISOString()};

        this.SendMessage(message);
        // Reset the text input
        event.target.value = '';
    }
    
    

  }
}
</script>

<style scoped>
.message-input {
  display: table-row;
  width: 100%;
  height: 26px;
}
textarea {
  width: 98%;
  height: 30px;
  padding: 0 5px;
  margin: 0;
  box-sizing: border-box;
  line-height: 20pt;
  resize: none;
  outline: none;
  font-size: 14px;
  border: solid 1px #AAAAAA;
  border-radius: 3px;
  font-family: Helvetica;
}
</style>