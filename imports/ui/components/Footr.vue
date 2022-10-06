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
    <div class="nav container overflow-hidden mb-5">
      <FooterNav/>
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
</style>