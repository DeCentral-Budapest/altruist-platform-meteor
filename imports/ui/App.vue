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
        <div class="card">
          <div class="card-header">
            <strong>The <abbr title="They connect people and build communities to create economic opportunity for all.">eBay</abbr> of <abbr title="the principle or practice of unselfish concern for or devotion to the welfare of others (opposed to egoism).">altruism</abbr><span>.</span></strong>
          </div>
          <div class="card-body">
            <h1 class="card-title container-fluid logo-before">alTRU.Eu.meteorapp<sup><small>.com</small></sup></h1>
              <p class="part card-text">A <strong>Trusted <abbr title="Free/Libre Open-Source Software; Libre: maintains the software user's civil liberty rights">F/LOSS</abbr> marketplace</strong> for <em>collaborative economy</em>, where individuals, communities and organisations able to share their <em>resources, services and needs</em> in a trusted way for <em>money</em>, in <em>exchange</em> for other goods and services, or like a <em>give away</em>, <abbr title="Alternative payment option, where the unconditional transaction will higher the seller's &quot;altruism score&quot;">for free</abbr>.
            </p>

            <div class="d-xl-inline-flex p-2 bd-highlight">
              <div class="card col-xl-6">
                <div class="card-header">
                  <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <a class="nav-link active keychainify-checked" id="login-tab" data-bs-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="true">Login</a>
                    </li>
                    <li class="nav-item" role="presentation">
                      <a class="nav-link keychainify-checked" id="signup-tab" data-bs-toggle="tab" href="#signup" role="tab" aria-controls="signup" aria-selected="false">Sign up</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link keychainify-checked" id="booking-tab" data-bs-toggle="tab" href="#booking" role="tab" aria-controls="booking" aria-selected="false">Booking</a>
                    </li>
                  </ul>
                </div>
                <div class="card-body">
                  <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="home-tab">
                      <div class="container">
                        <LoginForm/>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="signup" role="tabpanel" aria-labelledby="signup-tab">
                      <div class="container">
                        <RegisterForm/>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="booking" role="tabpanel" aria-labelledby="booking-tab">
                      <div class="container">
                        <BookingForm/>
                      </div>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>

              <Hello/>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Inbox from './components/Inbox.vue'
import ListingModal from './components/ListingModal.vue'
import ListingGrid from './components/ListingGrid.vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import BookingForm from './components/BookingForm.vue'
import Hello from './components/Hello.vue'
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
    Inbox,
    ListingModal,
    ProfileModal,
    ListingGrid,
    LoginForm,
    RegisterForm,
    BookingForm,
    Hello,
    TransactionPage,
  },
  meteor: {
    currentUser () {
        return Meteor.user();
    },
    $subscribe: {
      'users': [],
      'listings': [],
      'transactions': [],
      'reviews': [],
    },
  },
}
</script>

<style scoped>
  body {
    padding: 1em;
    }
  sup > small {
    font-size: 0.5em;
  }
  .text-right {
    text-align: right !important;
  }
  .logo-before:before {
    content: "💚🤲💝";
    background-image: url(/assets/images/altrueco-logo-v1.png);
    text-indent: -999px;
    overflow: hidden;
    width: 2.3em;
    display: inline-block;
    height: 1.3em;
    background-size: cover;
    vertical-align: text-bottom;
    }
</style>
