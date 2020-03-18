<template>
    <div>
        <ExchangeSent></ExchangeSent>
        <hr>
        <ExchangeRecieved></ExchangeRecieved>
    </div>
</template>
<script>
import ExchangeSent from '../ExchangeComponents/ExchangeSent';
import ExchangeRecieved from '../ExchangeComponents/ExchangeRecieved';
export default {
     components: {
      ExchangeSent,
      ExchangeRecieved
    }
}
</script>