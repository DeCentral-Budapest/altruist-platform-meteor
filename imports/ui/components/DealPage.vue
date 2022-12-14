<template>
    <div class="container">
        <div v-if="listing">
          <div class="row">
          <div class="col-md-3">
            <div class="card h-100">
                <img class="card-img-top" v-bind:src="listingImg(listing)" alt="">
                <div class="card-body">
                    <h5 class="card-title" @click="goto(listing)" v-html="listing.title"></h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{listing.category}}</h6>
                    <p class="card-text" v-html="listing.description"></p>
                    <p class="card-text"><small class="text-muted">{{listing.tags}}</small></p>
                </div>
            </div>
          </div>
          <div class="col-md-6">
            <Messenger></Messenger>
          </div>
          <div class="col-md-3">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title text-uppercase btn-outline-secondary">{{deal.status}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Listed by: {{getUserNameById(deal.listedBy)}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Taken by: {{getUserNameById(deal.takenBy)}}</h6>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <small v-html="dealStatusHints()"></small>
                    </li>
                    <li class="list-group-item">
                      <div v-if="deal.status === 'inquiry'">
                          <button class="btn btn-outline-warning" @click="changeStatus('canceled')">Cancel</button>
                          <button class="btn btn-success" @click="changeStatus('accepted')">Accept</button>
                      </div>
                      <div v-else-if="deal.status === 'accepted'">
                          <button class="btn btn-outline-warning" @click="changeStatus('disputed')">Dispute</button>
                          <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#reviewModal" @click="leaveReview()">Leave Review</button>
                      </div>
                    </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div v-else>Deal not found, or Session expired</div>
    </div>
</template>

<script>
import { Session } from 'meteor/session'
import Listings from '/imports/api/collections/Listings'
import Deals from '/imports/api/collections/Deals'
import Reviews from '/imports/api/collections/Reviews'
import Messenger from './Messenger.vue'

export default {
  data() {
    const dealId = this.$route.params.tid;
    return { 
      dealId
    };
  },
  components: {
    Messenger,
  },
  props: {
  },
  meteor: {
    $subscribe: {
      'listings': [],
      'dealsOfUser': [],
      'reviews': [],
    },
    deal() {
      const dealId = this.dealId;
      let deal = Deals.findOne(dealId);
      if (!deal) deal = {};
      Session.set('activeDeal', deal); // for Messenger
      return deal;
    },
    listing() {
      const dealId = this.dealId;
      let deal = Deals.findOne(dealId);
      let listing = deal?.listingId ? Listings.findOne(deal.listingId) : null;
      return listing;
    }
  },
  methods: {
    getUserNameById(userId) {
        const user = Meteor.users.findOne(userId)
        if (user) return user.username
        return 'Not found user'
    },
    dealStatusHints() {
        return this.deal?.getStatusObject(this.deal?.status).hint
    },
    goto(listing) {
      this.$router.push({ name: 'View listing', params: { lid: listing._id } })
    },
    changeStatus(status) {
        Meteor.call('statusChangeDeal', { dealId: this.dealId, status }, (err, res) => {
          if (err) {
            alert(err);
          }
        })
    },
    listingImg(listing) {
      return listing.imgURL || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEXv8PL6+/1/ipDz9Pbv7/Dt8PFueYB5g4n2+fzn6eyAiJB8ho16h4+Ai5Ht7vD19felq69zf4bBxsjS19l1gYTm6+yFjpSZnqKYoaR3hId3gYrh4eWytruOlZmUmqBwfILFy8yqsLTvp419AAAEDklEQVR4nO3b63aiMBSG4ZAQwzkqHqptR3v/NzkJtGptcIo6unfW986PWWuolsfEAA6KJPbEs3fgvwch/yDkH4T8g5B/EPIPQv5ByD8I+Qch/yDkH4T8g5B/F4TWKi5Ze5VQCT4pCCEkH4QQ0g9CCOkHIYT0gxBC+kEIIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDS75FCrW/a1SsfjjG8mzDVrvSWuicQoiEpdD+fJNntuZ0SaiTxUWOo15N7tB7/XnyIUDf2xZjNZmNuyT98+zJ2CB8kVLksX0Uq9I29VjIf+0Z80CzNZaX0jUcLv7deOPJZHicc+5BgTpiOfAgzYVnkYx8CIYS/DMKT+hVXh48JMQi1sCLPhQ0vmVEIs7d6Z97bLLg1BmH2ZyaLSu7mNrQ1AqGaz4qikLWc5KFfEoFQ/KkK6du+hQYxBuGqqjth9RHrGL5XshfGOob2bSu7aTppYx3DxjhhXZt1Etoag9DmcmG2k2kWvNKNQahV0s73eRLvOY03Wjt0IR+H8FLMhGr8h5KMhKoRqp2GT68vxEjYCNua2TR4SLgQH6EWWWuk9MShz87S0GrDSJh4oKxn0ywNE7t/VfZsKx+hbRelu0SS9WI6cDXvP85Qr/OMqdAB+/NrWZvB5UarvD6/EOYitO1GylNiYBjdCOarH9f6LIRa2+49eMgtN+n5oqLdTy1X/kJqts/E8RVgIUyPU/SzxTRwFprqsnQj7BajeXJcVTkIm8wBi2/C6vy4qN17sFlUlRdKN1GPWzkIk3ZRnAk98fuCkqrl10T+HEUuQv1zivYMf1zs56L/K7V5XZ1sNp6YshCmZ4vMQSjN9Hhw96uoqU+3H1ZU2kLVHyaKENGN0+dxsRvBrw/cDq/Abm/pC1XTAesw0BOTXqiWdfnjp3b7hLqwdCeZrRkawf696BFuFTXnI+j/9CsqVaHuhLadDfI6x8JfaailO2MNvgBzd9SkKuzG0K2iVWjXv42issuiGpjIWzeKlIV18DBxlvnIV8ER9FWLeeaEJO/F8LP0V9WlHB7noprNa6pjmP5S+A+/LGVB9I6h+wi709TIhdILR8ZQSHMMl/cCFsH//H6+UNxROPZXc5ulRNdSd1m4Dl41jc6sLc17hFPV3Ok+bzHwAfKThf29+smNt+v3O9XQXGn8zLrL9y0E1e9bPLPHCfUdvvd0zRNgDCGkH4QQ0g9CCOkHIYT0gxBC+kEIIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDSD8Jw1iouWXuVMJIg5B+E/IOQfxDyD0L+Qcg/CPkHIf8g5B+E/IOQfxDyL37hX1Wmjti02vgMAAAAAElFTkSuQmCC";
    },
    leaveReview() {
      // TODO
    }
  },
}
</script>

<style scoped>
</style>
