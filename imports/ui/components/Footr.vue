<template>
  <footer class="">
    <figure class="text-center">
      <blockquote class="blockquote">
        <p>We are provided with times of abundance which enables us to share with others.</p>
      </blockquote>
      <figcaption class="blockquote-footer">
        Permaculture Ethics <cite title="Source Title">Fair Share</cite>
      </figcaption>
    </figure>
    <div class="nav container overflow-hidden mb-5" v-if="currentUser">
      <FooterNav/>
      <div class="alert alert-success alert-dismissible fade show text-center fixed-bottom top-right m-5 pb-0 col-lg-4 col-md-6 col-sm-8" role="alert">
        <ul class="form-check-inline">
          <li>
            <a href="https://github.com/alTRUEco/alTRUE.meteor" target="_blank">
              <i class="fa-brands fa-github fa-fw"></i>
              Source code
            </a>
          </li>
          <li>
            <a href="https://doc.alTRU.Eco/" target="_blank">
              <i class="fa-regular fa-pencil-square-o fa-fw"></i>
              Documentation
            </a>
          </li>
          <li>
            <a href="https://github.com/alTRUEco/alTRUE.meteor/issues" target="_blank">
              <i class="fa-regular fa-dot-circle-o fa-fw"></i>
              Issues/feature requests
            </a>
          </li>
        </ul>
        <p class="form-check-inline">
          <a href="https://alTRU.Eco" title="Bottom-up economy to solve Scarcity | Toolkit with data privacy" target="_blank">
            <img src="/assets/images/alTRUEco-logo.png" alt="alTRUEco logo" style="max-height:5em;" />
          </a>
        </p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  </footer>
</template>

<script>
import FooterNav from './FooterNav.vue'

export default {
  meteor: {
    currentUser () {
        return Meteor.user();
    },
  },
  components: {
    FooterNav,
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
<style scope>
ul.form-check-inline {
    list-style: none;
    text-align: left;
    padding-left: 0;
}
</style>