<template>
    <div class="chat-container">
        <div class="heading">
        <h1>{{title + ' - User:ExchangeId ' + exchangeId }}</h1>
        </div>
        <div class="body">
            <div class="table">
                <chat-log v-bind:Id="id_exchange"></chat-log>
                <message-input v-bind:exchange_id="id_exchange"></message-input>
            </div>
        </div>
    </div>
</template>
<script>
import ChatLog from '../ChatContainer/ChatLog';
import MessageInput from '../ChatContainer/MessageInput';

export default {
    props: ["exchangeId"],
    data() {
        return {
            title: 'Exchange With',
            id_exchange: this.exchangeId
        };
    },
    name: 'chat-container',
    components: {
        ChatLog,
        MessageInput,
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