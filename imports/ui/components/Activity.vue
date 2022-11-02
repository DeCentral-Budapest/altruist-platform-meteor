<template>
  <div class="container-fluid">
    <div class="row message-wrapper">
      <div class="col-md-12">
        <h2>
          {{this.showAll ? 'All of Your' : 'Your active'}} <em>Deals</em> are listed here.
        </h2>
        <p class="form-check-inline">
          <em>Deals</em> are activities on your listed Goods &amp; Services and Needs. By default only the active <em>Deals</em> are shown.
        </p>
        <div class="form-check form-check-inline form-switch form-check-inline">
          <input class="form-check-input" type="checkbox" id="showAll" v-model="showAll">
          <label class="form-check-label" for="showAll">Show all</label>
        </div>
        <p>
          <router-link to="/myresources" class="btn btn-outline-primary keychainify-checked">Jump to my released <em>Resources</em> »</router-link>
          <router-link to="/myneeds" class="btn btn-outline-primary keychainify-checked">Jump to my released <em>Needs</em> »</router-link>
        </p>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </symbol>
          <strong>
          The <em>Deals</em> can have the following states:
          </strong>
          <span class="bg-primary text-light inline">Inquiry</span> | <span class="bg-danger text-light inline">Canceled</span> | <span class="bg-success text-light inline">Accepted</span> | <span class="bg-warning text-light inline">Disputed</span> | <span class="bg-info text-light inline">Reviewed</span> | <span class="bg-light inline">Archived</span>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
      <div class="col-md-4 message-sideleft">
        <div class="panel">
          <div class="panel-body no-padding">
            <div v-for="listing in listings" :key="listing._id" class="list-group no-margin list-message my-3">
              <div class="card h-100 listing">
                <!--img class="card-img-top" @click="goto(listing)" v-bind:src="listingImg(listing)" alt="Card image cap"-->
                <div class="card-body">
                  <h5 class="card-title listing-title" :class="{ need: listing.isNeed }" v-html="listing.title" @click="goto(listing)">{{listing.title}}</h5>
                  <span class="badge top-right rounded-pill bg-primary" :class="listing.category">{{listing.category}}</span>
                  <button v-if="listing.description" class="btn btn-secondary float-end collapsible" type="button" data-bs-toggle="collapse" :data-bs-target="returnID(listing._id,1)" aria-expanded="false" :aria-controls="returnID(listing._id)"><i class="fa fa-chevron-circle-down"></i></button>
                  <div class="collapse collapse-horizontal" :id="returnID(listing._id)">
                    <div class="card-text description" v-html="listing.description"></div>
                  </div>
                  <popper
                    trigger="clickToToggle"
                    :options="{
                      placement: 'top',
                      modifiers: { offset: { offset: '0,10px' } }
                    }">
                    <div class="popper" v-text="listing.tags"></div>
                 
                    <button v-if="listing.tags" slot="reference" class="btn btn-secondary tags-popper text-truncate" v-text="listing.tags"></button>
                  </popper>
                  <p class="card-text tags text-truncate"></p>
                <!--/div>
                <div class="card-footer"-->
                  <ul class="list-group list-group-flush">
                    <li v-for="deal in dealsOf(listing)" :key="deal._id" class="card border-primary btn btn-light" @click='setActive(deal);hasActive = deal._id;scrollMeTo("messenger")' :class="{'active': hasActive === deal._id}">
                      <div class="card-header">
                        {{todo(deal)}}
                      </div>
                      <div class="card-body">
                        <p class="card-text">
                          {{deal.lastMessageSender().username}}
                          <br />
                          {{deal.lastMessage()}}
                        </p>
                      </div>
                      <div class="card-footer text-muted">
                      {{deal.createdAt.toLocaleDateString()}} 
											  <span class="badge float-right rounded-pill" :class="bgClass(deal)"><i class="fa fa-fw" :class="faClass(deal)"></i></span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div><!-- /.listing -->
          </div><!-- /.panel-body -->
        </div><!-- /.panel -->
      </div><!-- /.message-sideleft -->
      <div v-if="activeDeal" class="col-md-8 message-panel" id="messenger" ref="messenger">
        <div class="card">
          <div class="card-header">
            <span class="badge float-right rounded-pill" :class="bgClass(activeDeal)"><i class="fa fa-fw" :class="faClass(activeDeal)"></i></span>
            <button type="button" class="btn btn-primary disabled" disabled>
              Listed by <span class="badge badge-light">{{getUserNameById(activeDeal.listedBy)}}</span>
            </button>
            <button type="button" class="btn btn-primary disabled" disabled>
              Inquiry by <span class="badge badge-light">{{getUserNameById(activeDeal.takenBy)}}</span>
            </button>
          </div>
          <Messenger></Messenger>
          <div class="card-footer text-muted">
            <dl class="row">
              <dt class="col-sm-2" v-text="activeDeal.status"></dt>
              <dd class="col-sm-10" v-html="dealStatusHints(activeDeal)"></dd>
            </dl>
          </div>
        </div>
      <!--/div>
      <div v-if="activeDeal" class="col-md-3 message-sideright"-->
        <ul class="list-group list-group-flush">
            <li class="list-group-item text-center">
              <div v-if="activeDeal.status === 'inquiry'">
                  <button class="btn btn-outline-warning" @click="changeStatus('canceled')">Cancel</button>
                  <button class="btn btn-success" @click="changeStatus('accepted')">Accept <i class="fa fa-fw fa-check"></i></button>
              </div>
              <div v-else-if="activeDeal.status === 'accepted'">
                  <button class="btn btn-outline-warning" @click="changeStatus('disputed')">Dispute <i class="fa fa-fw fa-exclamation"></i></button>
                  <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#reviewModal" @click="leaveReview()">Leave Review</button>
              </div>
            </li>
        </ul>
      </div><!-- /.message-sideright -->
      <div v-else>
        <Welcome/>
      </div>
    </div>
  </div>
</template>
  
<script>
import Popper from 'vue-popperjs';
import { Session } from 'meteor/session';
import { _ } from 'meteor/underscore';
import Listings from '/imports/api/collections/Listings'
import Deals from '/imports/api/collections/Deals'
import Reviews from '/imports/api/collections/Reviews'
import Messenger from './Messenger.vue'
import 'vue-popperjs/dist/vue-popper.css';
import Welcome from './Welcome.vue'
import Footr from './Footr.vue'
  
export default {
  data() {
    return {
      showAll: false,
      hasActive: ''
    }
  },
  components: {
    'popper': Popper,
    Messenger,
    Welcome,
    Footr,
  },
  meteor: {
    $subscribe: {
      'users': [],
      'listings': [],
      'dealsOfUser': [],
      'reviews': [],
    },
    listings() {
      const userId = Meteor.userId()
      const selector = { $or: [ { listedBy: userId }, { takenBy: userId } ] }
      if (!this.showAll) selector.status = { $in: ['inquiry', 'accepted'] }
      const deals = Deals.find(selector)
      const listingIds = _.uniq(deals.map(deal => deal.listingId))
      const listings = listingIds.map(id => Listings.findOne(id)).filter(elem => elem)
      console.log('listings', listings)
      return listings
    },
    activeDealId() {
      const deal = Session.get('activeDeal')
      return deal && deal._id
    },
    activeDeal() {
      let deal = Session.get('activeDeal')
      deal = deal ? Deals._transform(deal) : undefined
      return deal
    },
  },
  methods: {
    listingImg(listing) {
      return listing.imgURL || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEXv8PL6+/1/ipDz9Pbv7/Dt8PFueYB5g4n2+fzn6eyAiJB8ho16h4+Ai5Ht7vD19felq69zf4bBxsjS19l1gYTm6+yFjpSZnqKYoaR3hId3gYrh4eWytruOlZmUmqBwfILFy8yqsLTvp419AAAEDklEQVR4nO3b63aiMBSG4ZAQwzkqHqptR3v/NzkJtGptcIo6unfW986PWWuolsfEAA6KJPbEs3fgvwch/yDkH4T8g5B/EPIPQv5ByD8I+Qch/yDkH4T8g5B/F4TWKi5Ze5VQCT4pCCEkH4QQ0g9CCOkHIYT0gxBC+kEIIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDS75FCrW/a1SsfjjG8mzDVrvSWuicQoiEpdD+fJNntuZ0SaiTxUWOo15N7tB7/XnyIUDf2xZjNZmNuyT98+zJ2CB8kVLksX0Uq9I29VjIf+0Z80CzNZaX0jUcLv7deOPJZHicc+5BgTpiOfAgzYVnkYx8CIYS/DMKT+hVXh48JMQi1sCLPhQ0vmVEIs7d6Z97bLLg1BmH2ZyaLSu7mNrQ1AqGaz4qikLWc5KFfEoFQ/KkK6du+hQYxBuGqqjth9RHrGL5XshfGOob2bSu7aTppYx3DxjhhXZt1Etoag9DmcmG2k2kWvNKNQahV0s73eRLvOY03Wjt0IR+H8FLMhGr8h5KMhKoRqp2GT68vxEjYCNua2TR4SLgQH6EWWWuk9MShz87S0GrDSJh4oKxn0ywNE7t/VfZsKx+hbRelu0SS9WI6cDXvP85Qr/OMqdAB+/NrWZvB5UarvD6/EOYitO1GylNiYBjdCOarH9f6LIRa2+49eMgtN+n5oqLdTy1X/kJqts/E8RVgIUyPU/SzxTRwFprqsnQj7BajeXJcVTkIm8wBi2/C6vy4qN17sFlUlRdKN1GPWzkIk3ZRnAk98fuCkqrl10T+HEUuQv1zivYMf1zs56L/K7V5XZ1sNp6YshCmZ4vMQSjN9Hhw96uoqU+3H1ZU2kLVHyaKENGN0+dxsRvBrw/cDq/Abm/pC1XTAesw0BOTXqiWdfnjp3b7hLqwdCeZrRkawf696BFuFTXnI+j/9CsqVaHuhLadDfI6x8JfaailO2MNvgBzd9SkKuzG0K2iVWjXv42issuiGpjIWzeKlIV18DBxlvnIV8ER9FWLeeaEJO/F8LP0V9WlHB7noprNa6pjmP5S+A+/LGVB9I6h+wi709TIhdILR8ZQSHMMl/cCFsH//H6+UNxROPZXc5ulRNdSd1m4Dl41jc6sLc17hFPV3Ok+bzHwAfKThf29+smNt+v3O9XQXGn8zLrL9y0E1e9bPLPHCfUdvvd0zRNgDCGkH4QQ0g9CCOkHIYT0gxBC+kEIIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDSD8Jw1iouWXuVMJIg5B+E/IOQfxDyD0L+Qcg/CPkHIf8g5B+E/IOQfxDyL37hX1Wmjti02vgMAAAAAElFTkSuQmCC";
    },
    returnID(id,hasHash=0) {
      const pre = "_" // https://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
      return (hasHash?"#":"")+pre+id
    },
    setActive(deal) {
      console.log('Set active', deal)
      Session.set('activeDeal', deal)
    },
    dealsOf(listing) {
      const selector = { listingId: listing._id }
      if (!this.showAll) selector.status = { $in: ['inquiry', 'accepted'] }
      const deals = Deals.find(selector)
      console.log('deals', deals.fetch())
      return deals
    },
    contraPartyOf(deal) {
      return deal.contraPartyOf(Meteor.userId())
    },
    bgClass(deal) {
      return deal?.getStatusObject(deal.status).bgClass
    },
    faClass(deal) {
      return deal?.getStatusObject(deal.status).faClass
    },
    todo(deal) {
      return deal?.getStatusObject(deal.status).todo
    },
    getUserNameById(userId) {
        const user = Meteor.users.findOne(userId)
        if (user) return user.username
        return 'Not found user'
    },
    dealStatusHints(deal) {
      return deal?.getStatusObject(deal.status).hint
    },
    goto(listing) {
     // this.$router.push({ name: 'View listing', params: { lid: listing._id } })
		console.log('asd');
		console.log(this);
    },
    scrollMeTo(refName) {
      let element = this.$refs[refName];
      if (!element) {
        Meteor.defer(() => {
          element = this.$refs[refName];
          element?.scrollIntoView();
        });
      }
      else element.scrollIntoView();
    },
    changeStatus(status) {
        Meteor.call('statusChangeDeal', { dealId: Session.get('activeDeal')._id, status }, (err, res) => {
          if (!err) {
	    			const activeDeal = Session.get('activeDeal')
			    	Session.set('activeDeal', Deals.findOne(activeDeal._id) ) // to trigger reactive ui update
          }
          if (err) {
            alert(err);
          }
        })
    },
    leaveReview() {
        // TODO
    },
  },
}
</script>
  
<style scoped>
/* ========================================================================
 * MESSAGES
 * ======================================================================== */
.message form {
  padding: 6px 15px;
  border-bottom: 1px solid #E6EBED;
}
.message form .has-icon .form-control-icon {
  position: absolute;
  z-index: 5;
  top: 0;
  right: 0;
  width: 34px;
  line-height: 33px;
  text-align: center;
  color: #777;
}
.message > a {
  position: relative;
}
.message .indicator {
  text-align: center;
}
.message .indicator .spinner {
  left: 26%;
  width: 200px;
  font-size: 13px;
  line-height: 17px;
  color: #999;
}


.list-message .list-group-item {
  padding: 1em .2em;
}
.list-message .list-group-item.active {
  border-bottom: 1px solid #DDD !important;
}
.list-message .list-group-item.active p {
  color: #999999 !important;
}
.list-message .list-group-item small {
  font-size: 12px;
}
.list-message .list-group-item .list-group-item-heading {
  color: #999999 !important;
}
.list-message .list-group-item .list-group-item-text {
  margin-bottom: 10px;
}
.list-message .list-group-item:last-child {
  -moz-border-radius: 0px;
  -webkit-border-radius: 0px;
  border-radius: 0px;
  border-bottom: 1px solid #DDD !important;
}
.avatar{
    width:50px;
    height:50px;
} 
ul.list-group .card.btn {
    padding: 0;
}
.list-group.list-message {
    box-shadow: -1px 1px 2px;
}
ul.list-group span.badge, .card-footer span.badge, .card-header span.badge {
    margin: 0;
    padding: 0.3em 0.2em;
    float: right;
    font-size: 1em;
}
.btn.collapsible {
    padding: 0em 0.2em;
    border-radius: 50%;
    font-size: 1.2em;
}
button.tags-popper.text-truncate {
    max-width: 80%;
}
.badge.top-right.bg-primary {
    text-transform: capitalize;
}
</style>
  