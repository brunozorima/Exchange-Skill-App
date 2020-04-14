import { authHeader } from '../helpers';
import axios from 'axios';
const SKILL_API_URL = 'https://localhost:44381/api/skill';
const PERSON_API_URL = 'https://localhost:44381/api/person/';

export const skillService = {
    getAllSkills,
    getPersonHasSkillById,
    addHasSkill,
    addUserWantSkill,
    getSkillById,
    GetWantedPersonBySkillId,
    getWantedSkillsByPersonId,
    getPeopleOwnedSkillsBySkillId,
    RemoveOwnedSkill,
    RemoveWantedSkill
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

//remove a skill a user owns
async function RemoveOwnedSkill(loggedInUser, skillId){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return axios.delete(PERSON_API_URL + `${loggedInUser}/ownSkills/${skillId}`, requestOptions).then(handleResponse);
}

//remove a skill a user wanted to gain
async function RemoveWantedSkill(loggedInUser, skillId){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return axios.delete(PERSON_API_URL + `${loggedInUser}/wantedSkills/${skillId}`, requestOptions).then(handleResponse);
}


//get all the skills in the system
//get all the skills in the system
async function getAllSkills() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(SKILL_API_URL + '/skills', requestOptions)
    .then(handleResponse)
}

//list of all skills
async function getSkillById(skill_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(SKILL_API_URL + `/${skill_id}`, requestOptions).then(handleResponse);
}

//list of people with a particular skills
async function GetWantedPersonBySkillId(skill_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(SKILL_API_URL + `/${skill_id}/wantedPeople`, requestOptions).then(handleResponse);
}

//get a list of people who owns a particular skill based on the skill id
async function getPeopleOwnedSkillsBySkillId(skill_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(SKILL_API_URL + `/${skill_id}/owningPeople`, requestOptions).then(handleResponse);
}


/////////////////////////////////////////////////////////////////////
//get all skills a user / person HAVE based on a specific Person Id
//get all skills a user / person HAVE based on a specific Person Id
//get all skills a user / person HAVE based on a specific Person Id
async function getPersonHasSkillById(Person_Id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(PERSON_API_URL + `${Person_Id}/ownSkills`, requestOptions).then(handleResponse);
}

//add a [has or own skill] to the list
async function addHasSkill(Person_Id, id) {  
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json-patch+json;charset=UTF-8'}        
    };
    return axios.post(PERSON_API_URL + `${Person_Id}/ownSkills/${id}`, requestOptions)
    .then(handleResponse);
}

//add a [want / need skill] to the list
async function addUserWantSkill(Person_Id, skill_id) {  
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json-patch+json;charset=UTF-8'}        
    };
    return axios.post(PERSON_API_URL + `${Person_Id}/wantedSkills/${skill_id}`, requestOptions)
    .then(handleResponse);
}

//get the skills a person wants to gain
async function getWantedSkillsByPersonId(Person_Id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(PERSON_API_URL + `${Person_Id}/wantedSkills`, requestOptions).then(handleResponse);
}
