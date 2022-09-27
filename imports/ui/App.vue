<template>
  <div>
    <div v-if="currentUser">
      <Navbar />
      <router-view></router-view>
    </div>
    <div v-if="!currentUser">
      <div v-if="!registerActive" class="container-sm">
        <loginForm/>
        <div class="card">
          <div class="card-body">
            <h4 class="card-title" title="Invitation-only service">Invite only!</h4>
            <h6 class="card-subtitle mb-2 text-muted">Invitation-only service</h6>
            <p class="card-text">
              The Altruist Paltform is closed and one can only join by an invitation 
              from at least three existing users (who gained invitations in the system),
              and therefore self-curating to keep the quality of content in general. 
              That’s not a very democratic statement, but resources plus democracy equals ![_Trolling_](https://i.imgur.com/IJlEc0b.png)
              and the lack of _Trust_, which plays a key role in _Altruism_.
            </p>
            <a href="#!" class="card-link TODO"  @click="registerActive = !registerActive" title="Be one ofthe 1st to join the beta!">Book Now!</a>
            <a href="#!" class="card-link"  @click="registerActive = !registerActive" title="Sign up here if you are invited.">Sign up with Invited email address</a>
          </div>
        </div>
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
