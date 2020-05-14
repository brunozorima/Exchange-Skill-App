<template>
  <div>
    <h1>Matching Users</h1>
    <hr>
    <ul v-if="MatchingUSer.length > 0">
        <li v-for="(matchingUSer, index) in MatchingUSer" :key="index" >
            <router-link :to="{ name: 'UserProfile', params: { id: matchingUSer.userDetails.id, userObj: matchingUSer}}">{{matchingUSer.userDetails.firstName}} {{matchingUSer.userDetails.lastName}}</router-link>             
        </li>
    </ul>        
    <p v-else>No Users Available!</p>
    <hr>
    <h1>Users Offering The Skills You Seeking For</h1>
    <hr>
    <ul v-if="MatchingOfferingUSer.length > 0">
        <li v-for="(matchingOfferingUSer, index) in MatchingOfferingUSer" :key="index" >
            <router-link :to="{ name: 'UserProfile', params: { id: matchingOfferingUSer.userDetails.id, userObj: matchingOfferingUSer}}">{{matchingOfferingUSer.userDetails.firstName}} {{matchingOfferingUSer.userDetails.lastName}}</router-link>             
        </li>
    </ul>        
    <p v-else>No Users Offering!</p>
    <hr>
    <h1>Users Seeking The Skills You Are Offering</h1>
    <hr>
    <ul v-if="MatchingSeekingUSer.length > 0">
        <li v-for="(matchingSeekingUSer, index) in MatchingSeekingUSer" :key="index" >
            <router-link :to="{ name: 'UserProfile', params: { id: matchingSeekingUSer.userDetails.id, userObj:matchingSeekingUSer }}">{{matchingSeekingUSer.userDetails.firstName}} {{matchingSeekingUSer.userDetails.lastName}}</router-link>             
        </li>
    </ul>        
    <p v-else>No Users Seeking Your Skills!</p>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    mounted(){
        this.getUsersWithMatchingSkills(this.loggedUserId);
        this.getUsersOfferingSkills(this.loggedUserId);
        this.getUsersSeekingSkills(this.loggedUserId)

    },
    computed: {    
        ...mapGetters('account', ['loggedUserId']),
        ...mapState('skills', ['MatchingUSer','MatchingOfferingUSer','MatchingSeekingUSer'])
    },
    methods:{
        ...mapActions('skills',['getUsersWithMatchingSkills', 'getUsersOfferingSkills', 'getUsersSeekingSkills'])
    }

}
</script>

<style>

</style>