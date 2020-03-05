<template>
  <div>
    <user-details></user-details>
    <hr>
    <h1>Add New Skill</h1>
    <hr>
    <ListOfSkills></ListOfSkills>    
    <hr> 
    <user-owned-skill></user-owned-skill>
    <hr>
    <user-wanted-skill></user-wanted-skill>
    <hr>
    <ExchangeSent></ExchangeSent>
    <hr>
    <ExchangeRecieved></ExchangeRecieved>
  </div>
</template>
<script>
 import { mapState, mapActions, mapGetters } from 'vuex';
 import UserDetails from '../components/UserDetails';
 import UserOwnedSkill from '../components/UserOwnedSkill';
 import UserWantedSkill from '../components/UserWantedSkill';
 import ListOfSkills from '../components/ListOfSkills';
 import ExchangeSent from '../components/ExchangeComponents/ExchangeSent';
 import ExchangeRecieved from '../components/ExchangeComponents/ExchangeRecieved';

  export default {
    components: {
      UserDetails,
      UserOwnedSkill,
      UserWantedSkill,
      ListOfSkills,
      ExchangeSent,
      ExchangeRecieved
    }
  }
</script>