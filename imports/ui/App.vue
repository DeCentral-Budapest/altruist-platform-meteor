<template>
  <div class="container-fluid">
    <div class="row rounded shadow mb-5 pb-5">
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
    <Footr/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footr from './components/Footr.vue'
import FooterNav from './components/FooterNav.vue'
import Welcome from './components/Welcome.vue'
import Hello from './components/Hello.vue'
import Activity from './components/Activity.vue'
import ListingModal from './components/ListingModal.vue'
import ListingGrid from './components/ListingGrid.vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import BookingForm from './components/BookingForm.vue'
import ListingPage from './components/ListingPage.vue'
import DealPage from './components/DealPage.vue'
import ProfileModal from './components/ProfileModal.vue'

export default {
  data() {
    return {
      registerActive: false,
    }
  },
  components: {
    Navbar,
    Footr,
    FooterNav,
    Activity,
    ListingModal,
    ProfileModal,
    ListingGrid,
    LoginForm,
    RegisterForm,
    BookingForm,
    Welcome,
    Hello,
    DealPage,
    ListingPage,
  },
  meteor: {
    currentUser () {
        return Meteor.user();
    },
    $subscribe: {
      'users': [],
      'listings': [],
      'dealsOfUser': [],
      'reviews': [],
    },
  },
}
</script>

<style>
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
    margin-left: -0.8em;
  }
  span.inline {
    padding: 0em 0.2em 0.1em;
    margin: 0 -0.2em -0.1em;
    border-radius: 0.2em;
  }
  .badge.top-right {
    top: 1.6em;
    right: 1.6em;
    position: absolute;
  }
  .badge.bottom-right {
    bottom: 1.6em;
    right: 1.6em;
    position: absolute;
  }
  .float-right {
    float: right!important;
  }
  .float-left {
    float: left!important;
  }
  .listing blockquote {
    font-style: italic;
  }
  .listing-title:before {
    content: '💝';
  }
  .listing-title.need:before {
    content: '🤲';
  }
  .small.display-6 {
      font-size: 1.2em;
  }
  footer .list-group-item.nav-item {
    padding: 0 !important;
  }
  ul.nav-item {
      list-style: none;
      padding-left: 0;
  }
  footer a {
    text-decoration: none;
    padding: 0.8em 0em;
  }
  .list-group-flush {
    clear: both;
  }
</style>