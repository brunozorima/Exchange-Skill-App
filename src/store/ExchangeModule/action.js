export { exchangeService } from '../../services';

const actions = {
    GetExchangeRequestSentTo({ commit }, userId, status) {
        commit('GetExchangesSentRequest', userId, status);

        exchangeService.GetExchangeRequestSentTo(userId, status)
            .then(
                allRequests => commit('GetExchangesSentRequestSuccess', allRequests),
                err => commit('GetExchangesSentRequestFailure', err)
            );
    }
};
