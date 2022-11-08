<template>
<div v-if="listing">
    <ul>
        <li class="">Title:<span>{{listing.title}}</span></li>
        <li class="">Description:<span>{{listing.description}}</span></li>
        <li class="">Category:<span>{{listing.category}}</span></li>
        <li class="">Tags:<span>{{listing.tags}}</span></li>
        <li class="">isNeed:<span>{{listing.isNeed}}</span></li>
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
    return { 
      listingId
    };
  },
  meteor: {
    currentUser () {
        return Meteor.user();
    },
    listing() {
      const listing = Listings.findOne(this.listingId);
      return listing;
    }
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
