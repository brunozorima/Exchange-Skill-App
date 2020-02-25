import { authHeader } from '../helpers';
import axios from 'axios';
const API_URL = 'https://localhost:44381/api/access';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

//logs a user into the system
async function login(email, password) {   
    const data = {
        Email: email,
        Password: password
    };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json-patch+json;charset=UTF-8'}        
    };
    return axios.post(API_URL + '/login', data, requestOptions)
    .then(handleResponse)       
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

async function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

//register a new user
async function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json-patch+json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(user)
    };
    return axios.post(API_URL + '/register', user, requestOptions).then(handleResponse)
}

//get all the users in the system
async function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(API_URL + '/users', requestOptions)
    .then(handleResponse)
}

//get a user based on a specific Id
async function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(API_URL + `/${id}`, requestOptions).then(handleResponse);
}

//used to update a user details
async function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return axios.put(API_URL + `/updateUser/`,user, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return axios.delete(API_URL + `/${id}`, requestOptions).then(handleResponse);
}

async function handleResponse(response) {
    //handles the response back from the server
    if (response.status !== 200) {
        // auto logout if 401, 500 response returned from api
        logout();
        // return error message
        const error = (!response.data) || response.statusText;
        return Promise.reject(error);
    }
    return response.data;
}