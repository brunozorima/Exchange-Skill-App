import { exchangeService } from '../services';
import { router } from '../helpers';

const state = {
    SentRequests: {},
    RecievedRequests:{},
    Messages: {},
    ExchangeId: {},
    messageList:[]
};

const actions = {    
    SendMessage({commit}, messageObject){
        commit('SendingMessageRequest',  messageObject);
        exchangeService.SendMessage(messageObject)
            .then(message_id => {
                exchangeService.GetMessageById(message_id, messageObject.Sender_Id).then(
                    message => commit('MessageSent', message),
                    err => commit('MessageFailed', err)
                )
            }
        )
        err => commit('MessageFailed', err)
    },

    RequestExchange({ commit },  {exchangeRequest, message} ) {
        commit('RequestExchange', {exchangeRequest, message} );

        exchangeService.RequestExchange(exchangeRequest)
            .then(
                exchangeId => {
                    commit('RequestExchangeSuccess', exchangeId);    
                    message.Exchange_Id = exchangeId
                    exchangeService.SendMessage(message)
                    .then(
                        allMessages => commit('RequestExchangeSuccess', allMessages),
                        err => commit('RequestExchangeFailure', err)
                    )                
                    router.push('/dashboard');
                },
                error => {
                    commit('RequestExchangeFailure', error);
                }
            );
    },

    GetExchangeRequestSentTo({ commit }, userId) {
        commit('GetExchangesSentRequest', userId);

        exchangeService.GetExchangeRequestSentTo(userId)
            .then(
                allRequests => commit('GetExchangesSentRequestSuccess', allRequests),
                err => commit('GetExchangesSentRequestFailure', err)
            );
    },
    GetExchangeRequestRecievedFrom({ commit }, userId) {
        commit('GetExchangesRequestRecieved', userId);

        exchangeService.GetExchangeRequestRecievedFrom(userId)
            .then(
                allRequests => commit('GetExchangesRequestRecievedSuccess', allRequests),
                err => commit('GetExchangesRequestRecievedFailure', err)
            );
    },

    GetExchangeMessageByExchangeId({ commit }, {exchangeId, loggedUserId}) {
        commit('GetMessagesRequest', {exchangeId, loggedUserId});

        exchangeService.GetExchangeMessageByExchangeId(exchangeId, loggedUserId)
            .then(
                Messages => commit('GetMessageSuccess', Messages),
                err => commit('GetMessageFailure', err)
            );
    }
};

const mutations = {
    SendingMessageRequest(state, message){
        state.Messages = {newMsg: message}
    },
    MessageSent(state,message){   
        state.messageList.push(message);   
    },
    MessageFailed(state, err){
        state.Messages = {newMsg: err}
    },
    GetExchangesSentRequest(state, user_id){
        state.SentRequests = {data: {user_id}}
    },
    GetExchangesSentRequestSuccess(state, allRequests){
        state.SentRequests = { ReturnedData: true, allRequests}
    },
    GetExchangesSentRequestFailure(state, err){
        state.SentRequests = {err}
    },
    GetMessagesRequest(state, {exchangeId, loggedUserId}){
        state.Messages = {data: {exchangeId, loggedUserId}}
    },
    GetMessageSuccess(state, messages){
        state.messageList = messages;
    },
    GetMessageFailure(state, err){
        state.Messages = {err}
    },
    GetExchangesRequestRecieved(state, user_id){
        state.RecievedRequests = {data: {user_id}}
    },
    GetExchangesRequestRecievedSuccess(state, allRequests){
        state.RecievedRequests = { ReturnedData: true, allRequests}
    },
    GetExchangesRequestRecievedFailure(state, err){
        state.RecievedRequests = {err}
    },
    RequestExchange(state, exchangeRequest, message){
        state.ExchangeId = exchangeRequest, message
    },
    RequestExchangeSuccess(state, exchangeId){
        state.ExchangeId = { ReturnedData: true, exchangeId}
    },
    RequestExchangeFailure(state, err){
        state.ExchangeId = {err}
    },
};

export const exchange = {
    namespaced: true,
    state,
    actions,
    mutations
};
