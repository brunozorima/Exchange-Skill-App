<template>
    <div>
        <h1>Accepted Proposal: </h1>
        <ul v-if="AcceptedRequestsList.length > 0">
            <li v-for="(exchange, index) in AcceptedRequestsList" :key="index" >
                <router-link :to="{ name: 'ChatContainer', params: { exchangeId: exchange.exchange_Id, exchangeWith:exchange.firstName}}">{{exchange.firstName}} {{exchange.lastName}}</router-link>             
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
        ...mapActions('exchange',['GetAcceptedExchangesList'])
    }
}
</script>