<template>
  <div class="row">
    <div class="col-md-4 col-sm-4 col-lg-2 nav-item">
      <h1>
        <a class="navbar-brand" href="https://altru.eu.meteorapp.com/">alTRU.Eco</a>
      </h1>
      <address>
        <strong><abbr title="Közösségi Iroda és Központ">Önfejlesztők Háza</abbr></strong><br>
        Zichy Jenő u. 32.<br>
        Budapest, 1066-HU<br>
      </address>
      <address>
        <strong><abbr title="Developer Community">De-Central Budapest</abbr></strong><br>
        <abbr title="Email">E:</abbr> decentral.budapest<i class="fa fa-at"></i>gmail.com
      </address>
      <address>
        <strong><abbr title="The Local Resource Based Meritocratic CryptoEcoSystem">Projekt VáLTó</abbr></strong><br>
        Szeklerland, Transylvania<br>
        <abbr title="Phone">P:</abbr> +40735360065
      </address>
    </div>
    <ul class="col-md-3 col-sm-4 col-lg-2 list-group list-group-flush">
      <li class="list-group-item nav-item">
        <router-link to="/activity" class="nav-link active" role="button">Activity page</router-link>
      </li>
      <li class="list-group-item nav">
        <h3 class="small display-6">
          My listings
        </h3>
        <ul class="nav-item">
          <li><router-link to="/myresources" class="nav-link">My Resources</router-link></li>
          <li><router-link to="/mygoods" class="nav-link">- My Goods</router-link></li>
          <li><router-link to="/myservices" class="nav-link">- My Services</router-link></li>
          <li><router-link to="/myneeds" class="nav-link">My Needs</router-link></li>
          <li><a href="#" class="btn btn-outline-primary w-100" data-bs-toggle="modal" data-bs-target="#listingModal" role="button">Create new listing</a></li>
        </ul>
      </li>
    </ul>
    <ul class="col-md-3 col-sm-4 col-lg-2 nav-item list-group list-group-flush">
      <li class="list-group-item nav-item"><a href="#" class="nav-link disabled" data-bs-toggle="modal" data-bs-target="#listingModal" disabled>How do listings work?</a></li>
      <li class="list-group-item nav">
        <h3 class="small display-6">
          Accessible listings
        </h3>
        <ul class="nav-item">
          <li><router-link to="/listings" class="nav-link">Goods & Services</router-link></li>
          <li><router-link to="/needs" class="nav-link">Queries & Needs</router-link></li>
          <li><a href="#" class="nav-link disabled" data-bs-toggle="modal" data-bs-target="#listingModal" disabled>Filters and preferences</a></li>
        </ul>
      </li>
    </ul>
    <ul class="col-md-2 col-sm-4 col-lg-2 nav-item list-group list-group-flush">
      <li class="list-group-item nav">
        <h3 class="small display-6">
          <span v-if="currentUser.username">{{currentUser.username}}</span>
          <span v-else>{{currentUser.emails[0].address}}</span>
        </h3>
        <ul class="nav-item">
          <li><router-link to="/profile" class="nav-link" href="#">Profile</router-link></li>
          <li><a class="nav-link" @click="doLogout" role="button">Log Out</button></a></li>
        </ul>
      </li>
      <li class="list-group-item nav-item"><a href="#" class="nav-link disabled" data-bs-toggle="modal" data-bs-target="#listingModal" disabled>About membership and relations?</a></li>
      <li class="list-group-item nav-item">
        <a href="https://github.com/alTRUEco/alTRUE.meteor" title="Toolkit is to solve Scarcity with Sharing Economy." target="_blank">
          <i class="fa-brands fa-github fa-fw"></i>
          Source code
        </a>
      </li>
      <li class="list-group-item nav-item">
        <a href="https://docs.altru.eco/" title="alTRU.Eco - The eBay of altruism | alTRUE.meteor" target="_blank">
          <i class="fa-brands fa-github fa-fw"></i>
          Documentation
        </a>
      </li>
    </ul>
    <div class="col col-lg-4">
      <div class="">
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
    <div class="row container-fluid text-right">
      <div class="col">
        <small><a href="https://github.com/DeCentral-Budapest/altruist-platform-meteor/blob/main/LICENSE" target="_blank"><i class="fa-brands fa-github fa-fw"></i>AGPL-3.0 licensíe </a></small>
      </div>
      <div class="col">
        <small>Created with 💚 on the <em >Lands of the Hungarian Crown</em></small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    createNewListing() {
    }
  },
}
</script>
