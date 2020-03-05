const mutations = {
    GetExchangesSentRequest(state, user_id, status){
        state.GetSentRquestStatus = {data: {user_id, status}}
    },
    GetExchangesSentRequestSuccess(state, allRequests){
        state.GetSentRquestStatus = { ReturnedData: allRequests }
        state.SentRequests.push(allRequests)
    },
    GetExchangesSentRequestFailure(state, err){
        state.GetSentRquestStatus = {err}
    }
};