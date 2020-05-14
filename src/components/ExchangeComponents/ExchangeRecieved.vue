<template>
    <div>
        <h1>Accepted Proposal: </h1>
        <ul v-if="AcceptedRequestsList.length > 0">
            <li v-for="(exchange, index) in AcceptedRequestsList" :key="index" >
                <router-link :to="{ name: 'ChatContainer', params: { exchangeId: exchange.exchange_Id, exchangeWith:exchange.firstName, exchangeObject:exchange, exchangeIndex:index}}">{{exchange.firstName}} {{exchange.lastName}}</router-link>             
                <b-button pill variant="outline-secondary" @click="MarkRequestComplete(exchange, index)">Completed</b-button>
            </li>
        </ul>        
        <p v-else>No Proposal Available!</p>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
    mounted(){       
        this.GetAcceptedExchangesList(this.loggedUserId);
    },
    computed: {
        ...mapGetters('account', ['loggedUserId']),
        ...mapState('exchange', ['AcceptedRequestsList'])
    },
    methods: {
        ...mapActions('exchange',['GetAcceptedExchangesList', 'MarkRequestCompleted']),
        //local methods
        MarkRequestComplete(exchange,index){            
            this.MarkRequestCompleted({
            request_id: exchange.exchange_Id,
            status: 3,
            userId: this.loggedUserId,
            index: index
            })
        }
    }
}
</script>