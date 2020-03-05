<template>
    <div>
        <h1>Exchanges Recieved From: </h1>
        <ul>
            <li v-for="exchange in RecievedRequests.allRequests" :key="exchange.exchange_Id" >
                <router-link :to="{ name: 'Message', params: { exchangeId: exchange.exchange_Id}}"> {{exchange.lastName}}</router-link>             
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
    mounted(){       
        this.GetExchangeRequestRecievedFrom(this.loggedUserId);
    },
    computed: {
        ...mapGetters('account', ['loggedUserId']),
        ...mapState('exchange', ['RecievedRequests'])
    },
    methods: {
        ...mapActions('exchange',['GetExchangeRequestRecievedFrom'])
    }
}
</script>