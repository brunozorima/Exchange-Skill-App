<template>
    <div>
        <h1>Exchanges Sent To: </h1>
        <ul>
            <li v-for="exchange in SentRequests.allRequests" :key="exchange.exchange_Id" >
                <router-link :to="{ name: 'ChatContainer', params: { exchangeId: exchange.exchange_Id}}"> {{exchange.firstName}} {{exchange.lastName}}</router-link>             
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
    mounted(){       
        this.GetExchangeRequestSentTo(this.loggedUserId);
    },
    computed: {
        ...mapGetters('account', ['loggedUserId']),
        ...mapState('exchange', ['SentRequests'])
    },
    methods: {
        ...mapActions('exchange',['GetExchangeRequestSentTo'])
    }
}
</script>