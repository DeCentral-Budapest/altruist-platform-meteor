<template>
  <div>
    <h2>{{getTitle()}}</h2>
    <ul>
      <li>
        <form class="info-listings-add">
          <input type="text" v-model="title" name="title" placeholder="Title" required>
          <input type="text" v-model="category" name="category" placeholder="Category" required>
          <input type="text" v-model="description" name="description" placeholder="Description">
          <input type="text" v-model="tags" name="tags" placeholder="Tags">
          <input type="checkbox" v-model="isNeed" name="isNeed">
          <label for="isNeed">Is a Need</label>
          </br>
          <input type="submit" name="submit" @click="submit($event)" value="Add new listing">
        </form>
      </li>
    </ul>
  </div>
</template>

<script>
import Listings from '../../api/collections/Listings'

export default {
  data() {
    return this.doc || {
      title: "",
      category: "",
      description: "",
      tags: "",
      isNeed: false,
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
      Meteor.call('createListing', this.title, this.category, this.description, this.tags, this.isNeed, (error) => {
        if (error) {
          alert(error.error)
        } else {
          this.title = ''
          this.category = ''
          this.description = ''
          this.tags = ''
          this.isNeed = false
        }
      })
    },
    getTitle() {
      if (!this.doc) return "Create your listing!"
      return this.doc.title
    }
  },
}
</script>

<style scoped>
  ul {
    font-family: monospace;
  }
</style>
