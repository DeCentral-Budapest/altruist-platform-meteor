<template>
  <div>
    <div v-if="currentUser">
      <Navbar />
      <router-view></router-view>
      <ListingModal />
      <ProfileModal />
    </div>
    <div v-if="!currentUser">
      <div v-if="!registerActive" class="container-sm">
        <loginForm/>
        <div class="card">
          <div class="card-body">
            <h4 class="card-title" title="Invitation-only service">Invite only!</h4>
            <h6 class="card-subtitle mb-2 text-muted">Invitation-only service</h6>
            <p class="card-text">
              The <i>Altruist Paltform</i> is closed and one can only join by an invitation
              from at least three existing users (who gained invitations in the system),
              and therefore self-curating to keep the quality of content in general.
              That's not a very democratic statement, but resources plus democracy equals <i><img src="https://i.imgur.com/IJlEc0b.png" alt="Trolling" class="btn btn-close" style="height: 1.8em;width: 1.8em;padding: 0; cursor: not-allowed;"></i>
              and the lack of <i>Trust</i>, which plays a key role in <i>Altruism</i><sup class="cite"><a href="#fn1" id="#fnref1" name="#fnref1">[1]</a></sup>.
            </p>
            <a href="#!" class="btn btn-sm btn-outline-secondary TODO"  @click="registerActive = !registerActive" title="Be one of the 1st to join the beta!">Book Now!</a>
            <a href="#!" class="btn btn-sm btn-outline-success"  @click="registerActive = !registerActive" title="Sign up with Invited email address.">Sign up</a>
          </div>
          <div class="footnotes-list card-footer">
            <ol>
              <li id="fn1" class="footnote-item">
                <a href="https://en.wikipedia.org/wiki/Altruism" target="_blank" rel="noopener" class="keychainify-checked">Altruism on Wikipedia</a>, <a href="https://ethicsunwrapped.utexas.edu/glossary/altruism" target="_blank" rel="noopener" class="keychainify-checked">Altruism on Ethics Unwrapped</a></p>
              </li>
            </ol>
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
import ListingModal from './components/ListingModal.vue'
import ListingGrid from './components/ListingGrid.vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import TransactionPage from './components/TransactionPage.vue'
import ProfileModal from './components/ProfileModal.vue'

export default {
  data() {
    return {
      registerActive: false,
    }
  },
  components: {
    Navbar,
    ListingModal,
    ProfileModal,
    ListingGrid,
    LoginForm,
    RegisterForm,
    TransactionPage,
  },
  meteor: {
    currentUser () {
        return Meteor.user();
    },
    $subscribe: {
      'listings': [],
      'transactions': [],
      'reviews': [],
    },
  },
}
</script>

<style>
  body {
    padding: 20px;
  }
</style>
