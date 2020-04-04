<template>
    <div>
        <h2>Pending Exchanges</h2>
        <ul v-if="isExchangeEmpty">
            <li v-for="(exchange, index) in AllExchanges" :key="index" >                
                {{exchange.firstName}} {{exchange.lastName}}
                <b-button-group>
                    <b-button variant="success" @click="AcceptRequest(exchange, index)">Accept</b-button>
                    <b-button variant="danger"  @click="RejectRequest(exchange, index)">Reject</b-button>
                </b-button-group>
            </li>
        </ul>
        <ul v-if="AllSentRequests.length > 0">
            <li v-for="(exchange, index) in AllSentRequests" :key="index" >                
                {{exchange.firstName}} {{exchange.lastName}}
                <b-button-group>
                    <b-button variant="danger" @click="CancelRequests(exchange, index)">Cancel Request</b-button>
                </b-button-group>
            </li>
        </ul>
        <p v-if="!isExchangeEmpty && !AllSentRequests.length > 0">Notification is empty!</p>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
    mounted(){       
        this.GetExchangeRequestRecievedFrom(this.loggedUserId);  
        this.GetExchangeRequestSentTo(this.loggedUserId);      
    },
    computed: {        
        ...mapGetters('account', ['loggedUserId']),
        ...mapGetters('exchange', ['isExchangeEmpty']),
        ...mapState('exchange', ['AllExchanges','AllSentRequests'])
    },
    methods: {
        ...mapActions('exchange',['GetExchangeRequestRecievedFrom','UpdateRequest', 'GetExchangeRequestSentTo','CancelRequest','RejectExchange']),
        //local methods
        AcceptRequest(exchange, index){
            this.UpdateRequest({
                request_id: exchange.exchange_Id,
                status: 1, 
                userId: this.loggedUserId,
                exchange: exchange,
                index: index
            })
        },
        RejectRequest(exchange, index){
            this.RejectExchange({
                request_id: exchange.exchange_Id,
                userId: this.loggedUserId,
                index: index
            })
        },
        CancelRequests(exchange, index){
            this.CancelRequest({
                request_id: exchange.exchange_Id,
                userId: this.loggedUserId,
                index: index
            })
        }
    }
}
</script>