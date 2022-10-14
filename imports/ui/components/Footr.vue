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
        <h3 class="form-check-inline"><a href="https://roti.express/r/hmequl" target="_blank">Please give Us <br />some Feedback</a></h3>
        <p class="form-check-inline">
          using
          <br />
          <a href="https://roti.express/r/hmequl" target="_blank">
            <img src="https://roti.express/img/roti-magnet.png" alt="roti.express" style="max-height:5em;" />
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
</style>