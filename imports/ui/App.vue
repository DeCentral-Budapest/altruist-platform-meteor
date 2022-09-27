<template>
  <div>
    <div v-if="currentUser">
      <Navbar />
      <router-view></router-view>
    </div>
    <div v-if="!currentUser">
      <div v-if="!registerActive" class="container-sm">
        <loginForm/>
        <p>Don't have an account? <a href="#" @click="registerActive = !registerActive">Sign up here</a></p>
      </div>
      <div v-if="registerActive" class="container-sm">
        <registerForm/>
        <p>Already have an account? <a href="#" @click="registerActive = !registerActive">Sign in here</a></p>
      </div> 
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
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
    Navbar,
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
}
</script>

<style>
  body {
    padding: 20px;
  }
</style>
