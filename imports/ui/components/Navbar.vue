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
				<router-link to="/inbox" class="dropdown-item">Activity</router-link>
			  </a>
			</li>
			<li class="nav-item dropdown">
			  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				Listings
			  </a>
			  <ul class="dropdown-menu dropdown-menu-start">
				<li><h6 class="dropdown-header">My Listings</h6></li>
				<li><router-link to="/mygoods" class="dropdown-item">Goods</router-link></li>
				<li><router-link to="/myservices" class="dropdown-item">Services</router-link></li>
				<li><router-link to="/myneeds" class="dropdown-item">Needs</router-link></li>
				<li><router-link to="/myneeds" class="dropdown-item disabled" aria-disabled="true">Archives</router-link></li>
				<li><hr class="dropdown-divider"></li>
				<li><button class="dropdown-item active" data-bs-toggle="modal" data-bs-target="#listingModal">Create new listing</button></li>
				<li><hr class="dropdown-divider"></li>
				<li><h6 class="dropdown-header">Related Listings</h6></li>
				<li><router-link to="/offers" class="dropdown-item">Goods & Services</router-link></li>
				<li><router-link to="/needs" class="dropdown-item">Needs</router-link></li>
			  </ul>
			</li>
			<form class="d-flex" role="search">
				<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="searchText">
				<button class="btn btn-outline-success" type="submit" @click="doSearch">Search</button>
			</form>
			<li class="nav-item dropdown">
				<button type="button" class="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true" data-bs-display="static">
				  <span v-if="currentUser.username"><img class="avatar rounded-circle img-thumbnail" :alt="currentUser.realname" v-bind:src="avatarimg" />{{currentUser.username}}</span>
				  <span v-else>{{currentUser.emails[0].address}}</span>
				</button>
				<ul class="dropdown-menu dropdown-menu-end">
				  <li><h6 class="dropdown-header">My Profile</h6></li>
				  <li><router-link to="/profile" class="dropdown-item" href="">Profile</router-link></li>
				  <li><router-link to="/profile" class="dropdown-item disabled" aria-disabled="true">Wallet</router-link></li>
				  <li><router-link to="/profile" class="dropdown-item disabled" aria-disabled="true">Transaction History</router-link></li>
				  <li><router-link to="/profile" class="dropdown-item disabled" aria-disabled="true">Network Map</router-link></li>
				  <li><router-link to="/profile" class="dropdown-item disabled" aria-disabled="true">Invitations</router-link></li>
				  <li><hr class="dropdown-divider"></li>
				  <li><router-link to="/profile" class="dropdown-item" href="">Settings</router-link></li>
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
    avatarimg() {
      return Meteor.user()?.avatar;
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
