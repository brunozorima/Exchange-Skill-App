//The vuex users module is in charge of the skills section of the centralised state store. It contains actions for fetching all skills from the api and deleting a skill,
// and contains mutations for each of the lower level state changes involved in each action.
import { skillService } from '../services';

const state = {
    allSkills: {},
    myHasSkill: [],
    UserWantedSkills:{},
    myWantedSkillToGain: [],
    loadingMySkills: false,
    skillAdded: {},
    wantedPeople: {},
    OwnedSkillByPeople: {},
    MatchingUSer:[],
    MatchingOfferingUSer:[],
    MatchingSeekingUSer:[]
};

const actions = {
    //get all skills
    getAllSkills({ commit }) {
        commit('getAllSkillsRequest');

        skillService.getAllSkills()
            .then(
                skills => commit('getAllSkillsSuccess', skills),
                error => commit('getAllSkillsFailure', error)
            );
    },

        //get users with matching skills
    getUsersWithMatchingSkills({ commit }, person_id) {
        commit('MatchingRequest');

        skillService.GetAutoMatching(person_id)
            .then(
                matchingUsers => commit('MatchingSuccess', matchingUsers),
                error => commit('MatchingFailure', error)
            );
    },
          //get users offering the skills I am looking for
        getUsersOfferingSkills({ commit }, person_id) {
            commit('MatchingOfferingRequest');

            skillService.GetUserOffering(person_id)
                .then(
                    matchingUsers => commit('MatchingOfferingSuccess', matchingUsers),
                    error => commit('MatchingOfferingFailure', error)
                );
        },
              //get users seeking for the skills I am offering
    getUsersSeekingSkills({ commit }, person_id) {
        commit('MatchingSeekingRequest');

        skillService.GetUserSeeking(person_id)
            .then(
                matchingUsers => commit('MatchingSeekingSuccess', matchingUsers),
                error => commit('MatchingSeekingFailure', error)
            );
    },

    //get the list of skills a person HAVE based on their ID
    GetPersonHasSkillById({commit}, person_id){
        commit('getPersonHasSkillRequest');
        //get the skills
        skillService.getPersonHasSkillById(person_id)
        .then(
            skill => commit('getPersonHasSkillSuccess', skill),
            error => commit('getPersonHasSkillFailure', error )
        );
    },
    //get the list of skills a person Wants to gain based on their ID
    getWantedSkillsByPersonId({commit}, person_id){
        commit('getWantedSkillsByPersonIdRequest');
        //get the skills
        skillService.getWantedSkillsByPersonId(person_id)
        .then(
            skillToGain => commit('getWantedSkillsByPersonIdSuccess', skillToGain),
            error => commit('getWantedSkillsByPersonIdFailure', error )
        );
    },
    //create a new skill to learn or teach
    createSkill({commit}, {Id, Name, Category,Type,BelongsTo}){
        commit('createSkillRequest');

        skillService.createSkill(Id, Name, Category,Type,BelongsTo)
        .then(
            createdSkill => commit('CreateSkillSuccess', createdSkill),
            error => commit('CreateSkillFailure', error )
        );
    },

    //add a OWN or HAVE skill to a list
    addHasSkill({commit}, {person_id, id}){
        commit('addSkillRequest', id);

        skillService.addHasSkill(person_id, id);
        skillService.getSkillById(id)
        .then(
            new_added_skill => commit('addSkillSuccess', new_added_skill),
            error => commit('addSkillFailure', error )
        );
    },


    //add a WANT or NEED skill to a list of this particular user
    addUserWantSkill({commit}, {person_id, skill_id}){
        commit('addUserWantSkillRequest', skill_id);
        //save this new skill to the database
        skillService.addUserWantSkill(person_id, skill_id);
        skillService.getSkillById(skill_id)
        .then(
            added_wanted_skill => commit('addUserWantSkillSuccess', added_wanted_skill),
            error => commit('addUserWantSkillFailure', error )
        );
    },

    //get the list of people who Wants To Learn a particular skill based on given skill-ID
    getWantedPersonBySkillId({commit}, skill_id){
        commit('getWantedPeopleRequest', skill_id);
        //get a list of people with particular skill
        skillService.GetWantedPersonBySkillId(skill_id)
        .then(
            wantedPeople => commit('getWantedPeopleSuccess', wantedPeople),
            error => commit('getWantedPeopleFailure', error )
        );
    },

    //get a list of people who OWNS a particular skill set
    getPeopleOwnedSkillsBySkillId({commit}, skill_id){
        commit('getPeopleOwnedSkillsBySkillIdRequest', skill_id);
        //get a list of people with particular skill
        skillService.getPeopleOwnedSkillsBySkillId(skill_id)
        .then(
            PeopleOwnSkills => commit('getPeopleOwnedSkillsBySkillIdSuccess', PeopleOwnSkills),
            error => commit('getPeopleOwnedSkillsBySkillIdFailure', error )
        );
    },

    //remove a skill from a own or wanted list of skills
    RemoveSkill({commit}, {userId, skillId, index, type}){
        commit('RemoveSkillRequest', type);
        if(type === "own"){
            skillService.RemoveOwnedSkill(userId, skillId)
            .then(
                RemoveOwnSkill => commit('RemoveOwnSkillSuccess', index),
                err => commit('RemoveSkillFailure', err)
            );
        }
        else {
            skillService.RemoveWantedSkill(userId, skillId)
            .then(
                RemoveWantSkill => commit('RemoveWantSkillSuccess', index),
                err => commit('RemoveSkillFailure', err)
            );
        }
    }
};

const mutations = {
    MatchingRequest(state){
        state.MatchingUSer = {Matching:true};
    },
    MatchingSuccess(state, matchingResult){
        state.MatchingUSer = matchingResult;
    },
    MatchingFailure(state, err){
        state.MatchingUSer = {Error:err};
    },
    MatchingOfferingRequest(state){
        state.MatchingOfferingUSer = {Matching:true};
    },
    MatchingOfferingSuccess(state, matchingResult){
        state.MatchingOfferingUSer = matchingResult;
    },
    MatchingOfferingFailure(state, err){
        state.MatchingOfferingUSer = {Error:err};
    },
    MatchingSeekingRequest(state){
        state.MatchingSeekingUSer = {Matching:true};
    },
    MatchingSeekingSuccess(state, matchingResult){
        state.MatchingSeekingUSer = matchingResult;
    },
    MatchingSeekingFailure(state, err){
        state.MatchingSeekingUSer = {Error:err};
    },
    createSkillRequest(state, ){
        state.skillAdded = {Creating: true};
    },
    CreateSkillSuccess(state, createdSkill){
        state.skillAdded = {createdSkill};
    },
    CreateSkillFailure(state, err){
        state.skillAdded = {Error: 'No Skill Created', error:err};
    },
    RemoveSkillRequest(state, types){
        state.skillAdded = {type: types}
    },
    RemoveOwnSkillSuccess(state, index){
        state.myHasSkill.splice(index, 1)
    },
    RemoveWantSkillSuccess(state, index){
        state.myWantedSkillToGain.splice(index, 1)      
    },
    RemoveSkillFailure(state, err){
        state.skillAdded = {Error: 'No Skills Removed', erro:err}
    },
    addUserWantSkillRequest(state, id){
        state.skillAdded = {isAddding: true, id}
    },
    addUserWantSkillSuccess(state, WantedskillAdded){
        state.skillAdded = { new_wanted_skill_added: WantedskillAdded }
        state.myWantedSkillToGain.push(WantedskillAdded)
    },
    addUserWantSkillFailure(state, err){
        state.skillAdded = {err}
    },

    //requesting all available skill
    getAllSkillsRequest(state) {
        state.allSkills = { loading: true };
    },
    getAllSkillsSuccess(state, skills) {
        state.allSkills = { skills };
    },
    getAllSkillsFailure(state, error) {
        state.allSkills = { error };
    },

    //get a person all skills they have
    getPersonHasSkillRequest(state){
        state.allSkills.listOfSkills = {loadingMySkills: true};
    },
    getPersonHasSkillSuccess(state, skill) {
        state.myHasSkill = skill;
    },
    getPersonHasSkillFailure(state, err){
        state.myHasSkill = { err };
    },


    //add new has skill
    addSkillRequest(state, id){
        state.skillAdded = { isAdding: true, hasKill_id: id };
    },
    addSkillSuccess(state, addedSkill){
        state.skillAdded = { new_skill: addedSkill };
        state.myHasSkill.push(addedSkill)
    },
    addSkillFailure(state, error){
        state.skillAdded = {error}
    },


    //list of wanted people
    getWantedPeopleRequest(state, id){
        state.wantedPeople = { loading: true, skill_id: id };
    },
    getWantedPeopleSuccess(state, wantedPeople){
        state.wantedPeople = { wantedPeople };
    },
    getWantedPeopleFailure(state, err){
        state.wantedPeople = {err}
    },

    //get all the skills a person wants to gain or learn
    getWantedSkillsByPersonIdRequest(state, person_id){
        state.myWantedSkillToGain = {loading: true, Person_id: person_id}
    },
    getWantedSkillsByPersonIdSuccess(state, SkillsToGain){
        state.myWantedSkillToGain = SkillsToGain;
    },
    getWantedSkillsByPersonIdFailure(state, err) {
        state.myWantedSkillToGain = {err}
    },

    //get a list of who people who owns particular skills
    getPeopleOwnedSkillsBySkillIdRequest(state, id){
        state.OwnedSkillByPeople = {loading: true, skill_id: id}
    },
    getPeopleOwnedSkillsBySkillIdSuccess(state, skillOwned){
        state.OwnedSkillByPeople = {skillOwned}
    },
    getPeopleOwnedSkillsBySkillIdFailure(state, err) {
        state.OwnedSkillByPeople = { err }
    }

};

export const skills = {
    namespaced: true,
    state,
    actions,
    mutations
};