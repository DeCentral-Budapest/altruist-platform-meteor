<template>
  <div>
    <h2>Create your listing!</h2>
    <ul>
      <li>
        <form class="info-listings-add">
          <input type="text" v-model="title" name="title" placeholder="Title" required>
          <input type="text" v-model="category" name="url" placeholder="Category" required>
          <input type="submit" name="submit" @click="submit($event)" value="Add new listing">
        </form>
      </li>
      <li v-for="listing in listings"><p>{{listing.title}}</p> ({{listing.category}})</li>
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
      Meteor.call('createListing', this.title, this.category, (error) => {
        if (error) {
          alert(error.error)
        } else {
          this.title = ''
          this.category = ''
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
