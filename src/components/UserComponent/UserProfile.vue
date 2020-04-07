<template>
    <div>
        <h2>User Page</h2>
        <h4>{{this.user}}</h4>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
    props:["id"],
    mounted(){       
        this.getUserById(this.id);
    },
    computed: {
        ...mapState('users' , ['user'])
    },
    methods: {
        ...mapActions('users',['getUserById'])
    }
}
</script>