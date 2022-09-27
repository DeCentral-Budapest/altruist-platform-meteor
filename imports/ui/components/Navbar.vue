<template>

<header class="navbar navbar-expand-lg navbar-dark bd-navbar sticky-top">
  <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">AltruistPlatform</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            My listings
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">My offers</a></li>
            <li><a class="dropdown-item" href="#">My needs</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Create new listing</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Browse market
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Browse offers</a></li>
            <li><a class="dropdown-item" href="#">Browse needs</a></li>
          </ul>
        </li>
        <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </ul>

      <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
          <li class="nav-item col-6 col-lg-auto">
            <a class="nav-link py-2 px-0 px-lg-2" href="https://opencollective.com/bootstrap" target="_blank" rel="noopener">
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
              <div v-if="currentUser.username">{{currentUser.username}}</div>
              <div v-else>{{currentUser.emails[0].address}}</div>
            </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="">Settings</a></li>
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
  },
}
</script>