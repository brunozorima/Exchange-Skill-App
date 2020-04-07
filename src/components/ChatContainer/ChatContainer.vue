<template>
    <div class="chat-container">
        <div class="heading">
        <h1>{{title + exchangeWith }}</h1>
        </div>
        <div class="body">
            <div class="table">
                <chat-log v-bind:Id="id_exchange"></chat-log>
                <message-input v-show="status === 1" v-bind:exchange_id="id_exchange"></message-input>
                <b-button-group v-show="status === 0 && this.myExchange === false">
                    <b-button variant="success" @click="AcceptRequest()">Accept</b-button>
                    <b-button variant="danger"  @click="RejectRequest()">Reject</b-button>
                </b-button-group>
                <b-button v-show="status === 0 && this.myExchange === true" variant="danger" @click="CancelRequests(exchange, index)">Cancel Request</b-button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import ChatLog from '../ChatContainer/ChatLog';
import MessageInput from '../ChatContainer/MessageInput';

export default {
    props: ["exchangeId", "exchangeWith","exchangeObject","exchangeIndex","myExchange"],
    data() {
        return {
            title: 'Exchange With ',
            id_exchange: this.exchangeId,
            status: this.exchangeObject.status,
            index: this.exchangeIndex
        };
    },
    name: 'chat-container',
    components: {
        ChatLog,
        MessageInput,
    },
    computed: {
      ...mapGetters('account', ['loggedUserId'])
    },
    methods:{
        ...mapActions('exchange',['UpdateRequest','CancelRequest','RejectExchange']),
      AcceptRequest(){
        this.status = 1;
        this.UpdateRequest({
            request_id: this.id_exchange,
            status: this.status,
            userId: this.loggedUserId,
            exchange: this.exchangeObject,
            index: this.index
        })
      },
      RejectRequest(){
        this.status = 6;
        this.RejectExchange({
            request_id: this.id_exchange,
            userId: this.loggedUserId,
            index: this.index
        })
      }
    }
}
</script>
<style scoped>
h1 {
  display: table-cell;
  vertical-align: middle;
  margin: 0;
  font-size: 16px;
  font-weight: normal;
}
.chat-container {
  display: table;
  max-width: 400px;
  min-width: 300px;
  width: 25%;
  height: 500px;
  margin: auto;
  background-color: #FFFFFF;
  border: solid 1px #BFBFBF;
  border-radius: 3px;
}
.heading {
  display: table;
  width: 100%;
  height: 28px;
  text-align: center;
  background-color: #CDCDCD;
  border-radius: 3px 3px 0 0;
  -ms-user-select: none;
  user-select: none;
  background: linear-gradient(#EDEDED 0%, #CDCDCD 75%);
}
.body {
  display: block;
  width: auto;
  height: inherit;
  overflow: hidden;
}
.table {
  display: table;
  width: 100%;
  height: 100%;
}
</style