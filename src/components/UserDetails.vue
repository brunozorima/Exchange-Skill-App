<template>
    <div>
        <h1>Welcome To Dashboard, {{account.user.firstName}}!</h1>
        <hr>
        <table border="1" align="center">
        <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Location</th>
        </tr>
        <tr>
            <td>{{account.user.id}}</td>
            <td>{{account.user.firstName}}</td>
            <td>{{account.user.lastName}}</td>
            <td>{{account.user.email}}</td>
            <td>{{account.user.location}}</td>
        </tr> 
        </table>
    </div>
</template>
<script>
import  { mapState } from 'vuex';

    export default {
        computed: {
            ...mapState(['account'])
        }
    }
</script>
