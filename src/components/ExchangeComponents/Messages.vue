<template>
    <div>
        <h1>All Messages in this Exchange</h1>
         <!-- <ul>
            <li v-for="message in Messages.messages" :key="message.timeStamp" >
                From: {{message.from}}
                To: {{message.to}}
                Message: {{message.body}}
                Time: {{message.timeStamp}}
            </li>
        </ul> -->
        
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

// export default {  
//     props: ["exchangeId"],
//     mounted(){
//         this.GetExchangeMessageByExchangeId({
//                 exchangeId: this.exchangeId,
//                  loggedUserId: this.loggedUserId});
//     },    
//     computed: {
//         ...mapGetters('account', ['loggedUserId']),
//         ...mapState('exchange', ['Messages'])  
//     },
//     methods: {
//         ...mapActions('exchange', ['GetExchangeMessageByExchangeId'])        
//     }
// }
</script>