<template>
  <div>
    <user-details></user-details>
    <hr>
    <h1>Add New [Has Skill]</h1>
    <hr>
    <ListOfSkills></ListOfSkills>    
    <hr> 
    <user-owned-skill></user-owned-skill>
    <hr>
    <user-wanted-skill></user-wanted-skill>
  </div>
</template>
<script>
 import { mapState, mapActions, mapGetters } from 'vuex';
 import UserDetails from '../components/UserDetails';
 import UserOwnedSkill from '../components/UserOwnedSkill';
 import UserWantedSkill from '../components/UserWantedSkill';
 import ListOfSkills from '../components/ListOfSkills';

  export default {
    components: {
      UserDetails,
      UserOwnedSkill,
      UserWantedSkill,
      ListOfSkills
    }
  }
</script>