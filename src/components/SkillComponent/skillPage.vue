<template>
    <div>
        <UserOwnedSkill></UserOwnedSkill>
        <br>
        <UserWantedSkill></UserWantedSkill>
    </div>
</template>
<script>
import UserOwnedSkill from '../UserOwnedSkill';
import UserWantedSkill from '../UserWantedSkill';

export default {
    components: {
    UserOwnedSkill,
    UserWantedSkill
    }   
}
</script>