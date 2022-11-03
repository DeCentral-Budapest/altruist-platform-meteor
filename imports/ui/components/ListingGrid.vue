<template>
  <div>
    <h2>{{getTitle}}</h2>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      <div v-for="listing in listings" class="col">
        <div class="card h-100 listing">
          <img class="card-img-top" @click="goto(listing)" v-bind:src="listingImg(listing)" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title listing-title" :class="{ need: listing.isNeed }" v-html="listing.title" @click="goto(listing)">{{listing.title}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{listing.category}}</h6>
            <p class="card-text" v-html="listing.description"></p>
            <p class="card-text"><small class="text-muted">{{listing.tags}}</small></p>
            <div v-if="isOwnedByMe(listing)">
              <a href="#" class="btn btn-primary" @click="setActive(listing)" data-bs-toggle="modal" data-bs-target="#listingModal">Edit</a>
              <a href="#" class="btn btn-danger" @click="deleteListing(listing)">Delete</a>
            </div>
            <div v-else>
              <a href="#" class="btn btn-primary" @click="takeListing(listing)">
                Inquiry
                <i class="fas fa-paper-plane"></i>
              </a>
            </div>
          </div>
          <div class="card-footer">
            <small class="">{{creatorOf(listing)}}</small>
            <small class="text-muted float-right">{{listing.createdAt.toLocaleDateString()}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Session } from 'meteor/session';
import Listings from '/imports/api/collections/Listings'

export default {
  props: {
    isNeed: {
      type: String,
      default: "",
    },
    isServ: {
      type: String,
      default: "",
    },
    isGood: {
      type: String,
      default: "",
    },
    isOwn: {
      type: String,
      default: "",
    }
  },
  meteor: {
    $subscribe: {
      'listings': [],
    },
    listings () {
      let selector = {};
      if (this.isNeed !== "both" && this.isOwn !== "both") {
        const isNeed = this.isNeed === 'true' ? true : false
        const isServ = this.isServ === 'true' ? true : false
        const isGood = this.isGood === 'true' ? true : false
        const isOwn = this.isOwn === 'true' ? true : false
        selector = { isNeed }
        const userId = Meteor.userId()
        if (isServ) selector.category = 'services'
        if (isGood) selector.category = 'goods'
        if (isOwn) selector.createdBy = userId
        else selector.createdBy = { $ne: userId }
      }
      let listings = Listings.find(selector)
      if (Session.get("searchText")){
        const searchText = Session.get("searchText");
        listings = listings.fetch().filter(l =>
        l.title?.toLowerCase().search(searchText.toLowerCase()) >= 0
        || l.text?.toLowerCase().search(searchText.toLowerCase()) >= 0
        )
      }
      return listings;
    },
    getTitle() {
      const isNeed = this.isNeed === 'true' ? true : false
      const isServ = this.isServ === 'true' ? true : false
      const isGood = this.isGood === 'true' ? true : false
      const isOwn = this.isOwn === 'true' ? true : false
      let t = isOwn ? 'My ' : 'Browse '
      t += isNeed ? 'Needs' : (isGood ? 'Goods' : 'Services')
      return t;
    },
  },
  methods: {
    isOwnedByMe(listing) {
      return listing.createdBy === Meteor.userId();
    },
    listingImg(listing) {
      return listing.imgURL || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEXv8PL6+/1/ipDz9Pbv7/Dt8PFueYB5g4n2+fzn6eyAiJB8ho16h4+Ai5Ht7vD19felq69zf4bBxsjS19l1gYTm6+yFjpSZnqKYoaR3hId3gYrh4eWytruOlZmUmqBwfILFy8yqsLTvp419AAAEDklEQVR4nO3b63aiMBSG4ZAQwzkqHqptR3v/NzkJtGptcIo6unfW986PWWuolsfEAA6KJPbEs3fgvwch/yDkH4T8g5B/EPIPQv5ByD8I+Qch/yDkH4T8g5B/F4TWKi5Ze5VQCT4pCCEkH4QQ0g9CCOkHIYT0gxBC+kEIIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDS75FCrW/a1SsfjjG8mzDVrvSWuicQoiEpdD+fJNntuZ0SaiTxUWOo15N7tB7/XnyIUDf2xZjNZmNuyT98+zJ2CB8kVLksX0Uq9I29VjIf+0Z80CzNZaX0jUcLv7deOPJZHicc+5BgTpiOfAgzYVnkYx8CIYS/DMKT+hVXh48JMQi1sCLPhQ0vmVEIs7d6Z97bLLg1BmH2ZyaLSu7mNrQ1AqGaz4qikLWc5KFfEoFQ/KkK6du+hQYxBuGqqjth9RHrGL5XshfGOob2bSu7aTppYx3DxjhhXZt1Etoag9DmcmG2k2kWvNKNQahV0s73eRLvOY03Wjt0IR+H8FLMhGr8h5KMhKoRqp2GT68vxEjYCNua2TR4SLgQH6EWWWuk9MShz87S0GrDSJh4oKxn0ywNE7t/VfZsKx+hbRelu0SS9WI6cDXvP85Qr/OMqdAB+/NrWZvB5UarvD6/EOYitO1GylNiYBjdCOarH9f6LIRa2+49eMgtN+n5oqLdTy1X/kJqts/E8RVgIUyPU/SzxTRwFprqsnQj7BajeXJcVTkIm8wBi2/C6vy4qN17sFlUlRdKN1GPWzkIk3ZRnAk98fuCkqrl10T+HEUuQv1zivYMf1zs56L/K7V5XZ1sNp6YshCmZ4vMQSjN9Hhw96uoqU+3H1ZU2kLVHyaKENGN0+dxsRvBrw/cDq/Abm/pC1XTAesw0BOTXqiWdfnjp3b7hLqwdCeZrRkawf696BFuFTXnI+j/9CsqVaHuhLadDfI6x8JfaailO2MNvgBzd9SkKuzG0K2iVWjXv42issuiGpjIWzeKlIV18DBxlvnIV8ER9FWLeeaEJO/F8LP0V9WlHB7noprNa6pjmP5S+A+/LGVB9I6h+wi709TIhdILR8ZQSHMMl/cCFsH//H6+UNxROPZXc5ulRNdSd1m4Dl41jc6sLc17hFPV3Ok+bzHwAfKThf29+smNt+v3O9XQXGn8zLrL9y0E1e9bPLPHCfUdvvd0zRNgDCGkH4QQ0g9CCOkHIYT0gxBC+kEIIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDSD8Jw1iouWXuVMJIg5B+E/IOQfxDyD0L+Qcg/CPkHIf8g5B+E/IOQfxDyL37hX1Wmjti02vgMAAAAAElFTkSuQmCC";
    },
    deleteListing(listing) {
      Meteor.call('removeListing', listing._id)
    },
    setActive(listing) {
      Session.set('listing', listing)
    },
    goto(listing) {
      this.$router.push({ name: 'View listing', params: { lid: listing._id } })
    },
    creatorOf(listing) {
      const userId = listing.createdBy
      const user = Meteor.users.findOne(userId)
      return user?.username
    },
    takeListing(listing) {
      const self = this;
      const deal = {
        listingId: listing._id,
      }
      Meteor.call('initiateDeal', deal, (err, res) => {
        self.$router.push({ name: 'View deal', params: { tid: res } })
      });
    }
  },
}
</script>

<style scoped>
</style>

