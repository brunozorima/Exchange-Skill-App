<template>
    <div
        class="chat-log"
        ref="chatLogContainer"
    >
    <message-bubble
        v-for="(msg, index) in messageList" 
        v-bind:key="index"
        v-bind:uuid="msg.from"
        v-bind:text="msg.body"
    ></message-bubble>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import MessageBubble from '../ChatContainer/MessageBubble';

export default {
    props: ["Id"],
    mounted(){
        this.GetExchangeMessageByExchangeId({
                exchangeId: this.Id,
                 loggedUserId: this.loggedUserId});
    },    
    computed: {
        ...mapGetters('account', ['loggedUserId']),
        ...mapState('exchange', ['messageList'])  
    },
    methods: {
        ...mapActions('exchange', ['GetExchangeMessageByExchangeId']),
         scrollBottom() {
            this.$el.scrollTo(0, this.$el.scrollHeight);
        }        
    },
    name: 'chat-log',
    components: {MessageBubble},
    data() {
        return {
            vueChatMsg: this.messageList,
        }
    },
    watch: {
        vueChatMsg: function(){
            this.$nextTick(this.scrollBottom);
        }
    }
}
</script>
<style scoped>
.chat-log {
  display: block;
  height: inherit;
  width: 100%;
  padding: 2% 4%;
  box-sizing: border-box;
  overflow-y: scroll;
}
.chat-log::-webkit-scrollbar {
  display: none;
}
</style>
