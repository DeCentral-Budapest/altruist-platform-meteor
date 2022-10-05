<template>

	<header>
		asd
	</header>

</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
	name: "Header",
	components: {
		Navbar,
	},
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