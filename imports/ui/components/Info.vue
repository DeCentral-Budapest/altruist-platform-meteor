<template>
  <div>
    <h2>Create your listing!</h2>
    <ul>
      <li>
        <form class="info-listings-add">
          <input type="text" v-model="title" name="title" placeholder="Title" required>
          <input type="text" v-model="category" name="category" placeholder="Category" required>
          <input type="text" v-model="description" name="description" placeholder="Description">
          <input type="submit" name="submit" @click="submit($event)" value="Add new listing">
        </form>
      </li>
    </ul>
    </br>
    <h2>Current listings:</h2>
    <ul>
      <li v-for="listing in listings">{{listing.title}} ({{listing.category}}) [{{listing.description}}]</li>
    </ul>
  </div>
</template>

<script>
import Listings from '../../api/collections/Listings'

export default {
  data() {
    return {
      title: "",
      category: "",
      description: "",
    }
  },
  meteor: {
    $subscribe: {
      'listings': [],
    },
    listings () {
      return Listings.find({})
    },
  },
  methods: {
    submit(event) {
      event.preventDefault()
      Meteor.call('createListing', this.title, this.category, this.description, (error) => {
        if (error) {
          alert(error.error)
        } else {
          this.title = ''
          this.category = ''
          this.description = ''
        }
      })
    }
  },
}
</script>

<style scoped>
  ul {
    font-family: monospace;
  }
</style>
