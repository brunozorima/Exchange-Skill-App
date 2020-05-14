import { exchangeService } from '../services';
import { router } from '../helpers';

const state = {
    SentRequests: {},
    Messages: {},
    ExchangeId: {},
    messageList: [],
    AllExchanges: [],
    AcceptedRequestsList: [],
    AllSentRequests:[],
    ExchangeObject: {}
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
    },
    GetAcceptedExchangesList({ commit }, userId ) {
        commit('GetAcceptedRequestCommit', userId);

        exchangeService.GetAcceptedExchanges(userId)
            .then(
                acceptedRequests => commit('GetAcceptedRequestSuccess', acceptedRequests),
                err => commit('GetAcceptedRequestFailure', err)
            );
    },
    UpdateRequest({commit}, {request_id, status, userId, exchange, index}){
        commit('updateRequestCommit', request_id);

        exchangeService.UpdateRequest(request_id, status, userId)
            .then(
                updateExchangeStatus => commit('updateRequestSuccess', exchange, index),
                err => commit('updateRequestFailure', err)
            );
    },
    MarkRequestCompleted({commit}, {request_id, status, userId, index}){
        commit('CompleteRequestCommit');

        exchangeService.UpdateRequest(request_id, status, userId)
            .then(
                completedExchange => commit('CompleteRequestSuccess', index),
                err => commit('CompleteRequestFailure', err)
            );
    },
    CancelRequest({commit}, {request_id, userId, index}){
        commit('CancelRequestCommit', request_id);

        exchangeService.CancelRequest(request_id, userId)
            .then(
                CancelRequestStatus => commit('CancelRequestSuccess', index),
                err => commit('CancelRequestFailure', err)
            );
    },
    RejectExchange({commit}, {request_id, userId, index}){
        commit('RejectRequestCommit', request_id);

        exchangeService.CancelRequest(request_id, userId)
            .then(
                CancelRequestStatus => commit('RejectRequestSuccess', index),
                err => commit('RejectRequestFailure', err)
            );
    }
};

const mutations = {
    CompleteRequestCommit(state){
        state.ExchangeObject ={updating: true}
    },
    CompleteRequestSuccess(state, index){
        state.AcceptedRequestsList.splice(index, 1)
    },
    CompleteRequestFailure(state, err){
        state.ExchangeObject ={error: err}
    },
    CancelRequestCommit(state, req_id){
        state.ExchangeObject = req_id;
    },
    CancelRequestSuccess(state, index){
        state.AllSentRequests.splice(index, 1)
    },
    CancelRequestFailure(state, err){
        state.ExchangeObject = err;
    },
    RejectRequestCommit(state, req_id){
        state.ExchangeObject = req_id;
    },
    RejectRequestSuccess(state, index){
        state.AllExchanges.splice(index, 1)
    },
    RejectRequestFailure(state, err){
        state.ExchangeObject = err;
    },
    updateRequestCommit(state, request_id){
        state.exchangeId = request_id
    },
    updateRequestSuccess(state, exchange, index){
        state.AcceptedRequestsList.push(exchange)
        state.AllExchanges.splice(index, 1)
    },
    updateRequestFailure(state, err){
        state.exchangeId = err
    },
    GetAcceptedRequestCommit(state, userId){
        state.AcceptedRequestsList = userId
    },
    GetAcceptedRequestSuccess(state, AllAcceptedExchanges){
        state.AcceptedRequestsList = AllAcceptedExchanges.recieved.data
        AllAcceptedExchanges.sent.data.forEach(element => {
            state.AcceptedRequestsList.push(element) 
        });
    },
    GetAcceptedRequestFailure(state, err) {
        state.AcceptedRequestsList = err
    },

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
        state.AllSentRequests = allRequests;
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
        state.AllExchanges = {data: {user_id}}
    },
    GetExchangesRequestRecievedSuccess(state, allRequests){
        state.AllExchanges = allRequests;
    },
    GetExchangesRequestRecievedFailure(state, err){
        state.AllExchanges = {err}
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
const getters = {
    isExchangeEmpty: state => {
        if(state.AllExchanges.length > 0){
            return true
        }        
    } 
};

export const exchange = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
