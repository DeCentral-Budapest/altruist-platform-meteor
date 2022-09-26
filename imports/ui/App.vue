<template>
  <div>
    <h1>Welcome to the Altruist Platform!</h1>
    <Hello/>
    <div v-if="currentUser">
      <div v-if="currentUser.username">{{currentUser.username}}</div>
      <div v-else>{{currentUser.emails[0].address}}</div>
      <button @click="doLogout">Log Out</button>
      <InputForm/>
      <h2>Current offers:</h2>
      <ListingGrid isNeed=false />
      <h2>Current needs:</h2>
      <ListingGrid isNeed=true />
    </div>
    <div v-if="!currentUser">
      <div v-if="!registerActive">
        <loginForm/>
        <p>Don't have an account? <a href="#" @click="registerActive = !registerActive">Sign up here</a></p>
      </div>
      <div v-if="registerActive">
        <registerForm/>
        <p>Already have an account? <a href="#" @click="registerActive = !registerActive">Sign in here</a></p>
      </div> 
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import InputForm from './components/InputForm.vue'
import ListingGrid from './components/ListingGrid.vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'

export default {
  data() {
    return {
      registerActive: false,
    }
  },
  components: {
    Hello,
    InputForm,
    ListingGrid,
    LoginForm,
    RegisterForm,
  },
  meteor: {
    currentUser () {
      return Meteor.user();
    },
  },
  methods: {
    doLogout() {
      Meteor.logout(function(error) {
        if (error) alert(error.message);
      });
    },
  }
}
</script>

<style>
  body {
    padding: 20px;
  }
</style>
