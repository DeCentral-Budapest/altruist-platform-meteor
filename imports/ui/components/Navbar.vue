<template>

<header>
  <nav class="navbar navbar-expand-md bg-light sticky-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="https://altru.eu.meteorapp.com/">alTRU.Eu.meteorapp<sup>.com</sup></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#" role="button" aria-expanded="false">
            <router-link to="/inbox" class="dropdown-item">Inbox</router-link>
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            My listings
          </a>
          <ul class="dropdown-menu">
            <li><router-link to="/myoffers" class="dropdown-item">My offers</router-link></li>
            <li><router-link to="/myneeds" class="dropdown-item">My needs</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#listingModal">Create new listing</button></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Browse market
          </a>
          <ul class="dropdown-menu">
            <li><router-link to="/offers" class="dropdown-item">Browse offers</router-link></li>
            <li><router-link to="/needs" class="dropdown-item">Browse needs</router-link></li>
          </ul>
        </li>
        <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="searchText">
            <button class="btn btn-outline-success" type="submit" @click="doSearch">Search</button>
        </form>
      </ul>

      <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
          <li class="nav-item col-6 col-lg-auto">
            <a class="nav-link py-2 px-0 px-lg-2" href="">
              <i class="fa-solid fa-cart-shopping"></i>
              <small class="d-lg-none ms-2">Cart</small>
            </a>
          </li>
          <li class="nav-item py-1 col-12 col-lg-auto">
            <div class="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
            <hr class="d-lg-none text-white-50">
          </li>
          <li class="nav-item dropdown">
            <button type="button" class="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true" data-bs-display="static">
              <span v-if="currentUser.username">{{currentUser.username}}</span>
              <span v-else>{{currentUser.emails[0].address}}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><router-link to="/profile" class="dropdown-item" href="">Profile</router-link></li>
              <li><button class="dropdown-item" @click="doLogout">Log Out</button></li>
            </ul>
          </li>
        </ul>
    </div>
  </div>
  </nav>
</header>

</template>

<script>
export default {
  name: "Navbar",
  data () {
    return {
      searchText: ""
    }
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
    doSearch() {
      if (!this.searchText) return;
      Session.set("searchText", this.searchText);
      if (this.$route.name != "Search results") {
        this.$router.push({
          name: "Search results",
        });
      }
    }
  },
}
</script>
