//deals with all exchange requests and messages between users
import { authHeader } from '../helpers';
import axios from 'axios';
const API_URL = 'https://localhost:44381/api/exchange';
const API_URL_Message = 'https://localhost:44381/api/Message';

export const exchangeService = {
    RequestExchange,
    SendMessage,
    GetMessageById,
    GetExchangeMessageByExchangeId,
    GetExchangeRequestSentTo,
    GetExchangeRequestRecievedFrom   
};

//Handless all requests
async function handleResponse(response) {
    //handles the response back from the server
    if (response.status !== 200) {
        // auto logout if 401, 500, 404 response returned from api
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        // return error message
        const error = (!response.data) || response.statusText;
        return Promise.reject(error);
    }
    return response.data;
}

//get all exchange requests sent To this user based on the userId
async function GetExchangeRequestSentTo(userId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.get(API_URL + `/user/${userId}/sent`, requestOptions).then(handleResponse);
}
//get all the requests RECIEVED for this user
async function GetExchangeRequestRecievedFrom(userId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.get(API_URL + `/user/${userId}/recieved`, requestOptions).then(handleResponse);
}

//get all exchange requests sent To this user based on the userId
async function GetExchangeMessageByExchangeId(exchangeId, loggedUserId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.get(API_URL + `/${exchangeId}/message/${loggedUserId}`, requestOptions).then(handleResponse);
}

//Request a new Exchange
async function RequestExchange(exchangeRequest) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json-patch+json;charset=UTF-8'}        
    };
    return axios.post(API_URL + '/request', exchangeRequest, requestOptions).then(handleResponse)
}

//Send the message to the recipient user
async function SendMessage(exchangeMessage) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json-patch+json;charset=UTF-8'}        
    };
    return axios.post(API_URL + '/message', exchangeMessage, requestOptions).then(handleResponse)
}
async function GetMessageById(message_id, loggedInUser){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return axios.get(API_URL_Message + `/${message_id}/user/${loggedInUser}`, requestOptions).then(handleResponse);
}