<template>
<div>
    <ul>
        <li class="">Title:<span>{{this.title}}</span></li>
        <li class="">Description:<span>{{this.description}}</span></li>
        <li class="">Category:<span>{{this.category}}</span></li>
        <li class="">Tags:<span>{{this.tags}}</span></li>
        <li class="">isNeed:<span>{{this.isNeed}}</span></li>
    </ul>
    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#listingModal" @click="editAction">Edit</button>
</div>
</template>

<script>
import bootstrap from 'bootstrap';
import Listings from '/imports/api/collections/Listings'

export default {
  data() {
    const listingId = this.$route.params.lid
    const listing = Listings.findOne(listingId)
    return listing;
  },
  meteor: {
    currentUser () {
        return Meteor.user();
    },
  },
  methods: {
    editAction(event) {
        debugger
        //TODO Fill up ListingModal with current listing
    },
  },
}
</script>

<style>
</style>
