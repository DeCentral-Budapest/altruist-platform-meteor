<template>
<div>
  <div class="row message-wrapper rounded shadow mb-20">
    <div class="col-md-3 message-sideleft">
      <div class="panel">
        <div class="panel-heading">
          <h3 class="panel-title">{{this.showAll ? 'All Transactions' : 'Active Listings'}}</h3>
          <div class="mb-3">
            <div class="form-check form-check-inline form-switch">
              <input class="form-check-input" type="checkbox" id="showAll" v-model="showAll">
              <label class="form-check-label" for="showAll">Show all</label>
          </div>
        </div>
        </div><!-- /.panel-heading -->
        <div class="panel-body no-padding">
          <div v-for="listing in listings" class="list-group no-margin list-message">
            <div class="card h-100 listing">
              <!--img class="card-img-top" @click="goto(listing)" v-bind:src="listingImg(listing)" alt="Card image cap"-->
              <div class="card-body">
                <h5 class="card-title listing-title" :class="{ need: listing.isNeed }" v-html="listing.title" @click="goto(listing)">{{listing.title}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{listing.category}}</h6>
				<span class="btn badge bg-primary float-end" data-bs-toggle="collapse" :data-bs-target="returnID(listing._id)" aria-expanded="false" aria-controls="collapseWidthExample"><i class="fa fa-chevron-circle-down"></i></span>
				<div class="collapse collapse-horizontal" :id="listing._id">
					<div class="card-text description" v-html="listing.description">
					  This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
					</div>
				</div>
                <p class="card-text tags"><small class="text-muted">{{listing.tags}}</small></p>
                <p class="card-text offer"><small class="text-muted">{{listing.offer}}</small></p>
              <!--/div>
              <div class="card-footer"-->
                <ul class="list-group list-group-flush">
                  <li v-for="tx in transactionsOf(listing)" class="card border-primary btn btn-light" @click='setActive(tx);hasActive = tx._id;scrollMeTo("messenger")' :class="{'active': hasActive === tx._id}">
					  <div class="card-header">
						{{whatToDo(tx)}}
					  </div>
					  <div class="card-body">
						<p class="card-text">
							{{contraPartyOf(tx).username}}
						<br />{{lastMessage(tx)}} </p>
					  </div>
					  <div class="card-footer text-muted">
						{{tx.createdAt.toLocaleDateString()}} 
<span class="badge float-right bg-success rounded-pill" v-if="tx.status === 'accepted'"><i class="fa fa-fw fa-check"></i></span>
<span class="badge float-right bg-primary rounded-pill" v-if="tx.status === 'inquiry'"><i class="fa fa-fw fa-question"></i></span>
<span class="badge float-right bg-warning rounded-pill" v-if="tx.status === 'disputed'"><i class="fa fa-fw fa-exclamation"></i></span>
<span class="badge float-right bg-danger rounded-pill" v-if="tx.status === 'canceled'"><i class="fa fa-fw fa-times"></i></span>
					  </div>
                  </li>
                </ul>
              </div>
            </div>
          </div><!-- /.listing -->
        </div><!-- /.panel-body -->
      </div><!-- /.panel -->
    </div><!-- /.message-sideleft -->
    <div v-if="activeTx" class="col-md-6 message-panel" id="messenger" ref="messenger">
        <Messenger></Messenger>
    <!--/div>
    <div v-if="activeTx" class="col-md-3 message-sideright"-->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-uppercase btn-outline-secondary">{{activeTx.status}}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Listed by: {{getUserNameById(activeTx.listedBy)}}</h6>
          <h6 class="card-subtitle mb-2 text-muted">Taken by: {{getUserNameById(activeTx.takenBy)}}</h6>
          <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <small>{{transactionStatusHints(activeTx.status)}}</small>
              </li>
              <li class="list-group-item text-center">
                <div v-if="activeTx.status === 'inquiry'">
                    <button class="btn btn-outline-warning" @click="changeStatus('canceled')">Cancel</button>
                    <button class="btn btn-success" @click="changeStatus('accepted')">Accept <i class="fa fa-fw fa-check"></i></button>
                </div>
                <div v-else-if="activeTx.status === 'accepted'">
                    <button class="btn btn-outline-warning" @click="changeStatus('disputed')">Dispute <i class="fa fa-fw fa-exclamation"></i></button>
                    <button class="btn btn-success" @click="leaveReview()">Leave Review</button>
                </div>
              </li>
          </ul>
        </div>
      </div>
    </div><!-- /.message-sideright -->
  </div>
</div>
</template>
  
<script>
import { Session } from 'meteor/session';
import { _ } from 'meteor/underscore';
import Listings from '/imports/api/collections/Listings'
import Transactions from '/imports/api/collections/Transactions'
import Messenger from './Messenger.vue'

export default {
  data() {
    return {
      showAll: false,
	  hasActive: ''
    }
  },
  components: {
    Messenger,
  },
  meteor: {
    $subscribe: {
      'users': [],
      'listings': [],
      'transactions': [],
      'reviews': [],
    },
    listings() {
//      console.log('Listings.find()', Listings.find().fetch())
//      return Listings.find().fetch()
      const userId = Meteor.userId()
      const selector = { $or: [ { listedBy: userId }, { takenBy: userId } ] }
      if (!this.showAll) selector.status = { $in: ['inquiry', 'accepted'] }
      const txs = Transactions.find(selector)
      const listingIds = _.uniq(txs.map(tx => tx.listingId))
      const listings = listingIds.map(id => Listings.findOne(id))
      console.log('listings', listings)
      return listings
    },
    activeTxId() {
      const activeTx = Session.get('activeTx')
      return activeTx && activeTx._id
    },
    activeTx() {
      return Session.get('activeTx')
    },
  },
  methods: {
    listingImg(listing) {
      return listing.imgURL || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEXv8PL6+/1/ipDz9Pbv7/Dt8PFueYB5g4n2+fzn6eyAiJB8ho16h4+Ai5Ht7vD19felq69zf4bBxsjS19l1gYTm6+yFjpSZnqKYoaR3hId3gYrh4eWytruOlZmUmqBwfILFy8yqsLTvp419AAAEDklEQVR4nO3b63aiMBSG4ZAQwzkqHqptR3v/NzkJtGptcIo6unfW986PWWuolsfEAA6KJPbEs3fgvwch/yDkH4T8g5B/EPIPQv5ByD8I+Qch/yDkH4T8g5B/F4TWKi5Ze5VQCT4pCCEkH4QQ0g9CCOkHIYT0gxBC+kEIIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDS75FCrW/a1SsfjjG8mzDVrvSWuicQoiEpdD+fJNntuZ0SaiTxUWOo15N7tB7/XnyIUDf2xZjNZmNuyT98+zJ2CB8kVLksX0Uq9I29VjIf+0Z80CzNZaX0jUcLv7deOPJZHicc+5BgTpiOfAgzYVnkYx8CIYS/DMKT+hVXh48JMQi1sCLPhQ0vmVEIs7d6Z97bLLg1BmH2ZyaLSu7mNrQ1AqGaz4qikLWc5KFfEoFQ/KkK6du+hQYxBuGqqjth9RHrGL5XshfGOob2bSu7aTppYx3DxjhhXZt1Etoag9DmcmG2k2kWvNKNQahV0s73eRLvOY03Wjt0IR+H8FLMhGr8h5KMhKoRqp2GT68vxEjYCNua2TR4SLgQH6EWWWuk9MShz87S0GrDSJh4oKxn0ywNE7t/VfZsKx+hbRelu0SS9WI6cDXvP85Qr/OMqdAB+/NrWZvB5UarvD6/EOYitO1GylNiYBjdCOarH9f6LIRa2+49eMgtN+n5oqLdTy1X/kJqts/E8RVgIUyPU/SzxTRwFprqsnQj7BajeXJcVTkIm8wBi2/C6vy4qN17sFlUlRdKN1GPWzkIk3ZRnAk98fuCkqrl10T+HEUuQv1zivYMf1zs56L/K7V5XZ1sNp6YshCmZ4vMQSjN9Hhw96uoqU+3H1ZU2kLVHyaKENGN0+dxsRvBrw/cDq/Abm/pC1XTAesw0BOTXqiWdfnjp3b7hLqwdCeZrRkawf696BFuFTXnI+j/9CsqVaHuhLadDfI6x8JfaailO2MNvgBzd9SkKuzG0K2iVWjXv42issuiGpjIWzeKlIV18DBxlvnIV8ER9FWLeeaEJO/F8LP0V9WlHB7noprNa6pjmP5S+A+/LGVB9I6h+wi709TIhdILR8ZQSHMMl/cCFsH//H6+UNxROPZXc5ulRNdSd1m4Dl41jc6sLc17hFPV3Ok+bzHwAfKThf29+smNt+v3O9XQXGn8zLrL9y0E1e9bPLPHCfUdvvd0zRNgDCGkH4QQ0g9CCOkHIYT0gxBC+kEIIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDSD8Jw1iouWXuVMJIg5B+E/IOQfxDyD0L+Qcg/CPkHIf8g5B+E/IOQfxDyL37hX1Wmjti02vgMAAAAAElFTkSuQmCC";
    },
    returnID(id) {
      return "#"+id
    },
    setActive(tx) {
      console.log('Set active', tx)
      Session.set('activeTx', tx)
    },
    transactionsOf(listing) {
      const selector = { listingId: listing._id }
      if (!this.showAll) selector.status = { $in: ['inquiry', 'accepted'] }
      const transactions = Transactions.find(selector)
      console.log('transactions', transactions)
      return transactions
    },
    contraPartyOf(transaction) {
      let contraPartyId
      const userId = Meteor.userId()
      if (transaction.listedBy === userId) contraPartyId = transaction.takenBy
      else if (transaction.takenBy === userId) contraPartyId = transaction.listedBy
      else return { username: "Not found" }
      return Meteor.users.findOne(contraPartyId) || { username: "Not found" }
    },
    lastMessage(transaction) {
      const chat = transaction.chat
      if (chat.length === 0) return 
      const lastMsg = _.last(chat)
      if (lastMsg.text) return lastMsg.text.substr(0, 20) + '…'
      else if (lastMsg.status) return lastMsg.status
      return 'ERROR'
    },
    whatToDo(trasaction) {
      return Transactions.statusTodos[trasaction.status]
    },
    getUserNameById(userId) {
        const user = Meteor.users.findOne(userId)
        if (user) return user.username
        return 'Not found user'
    },
    transactionStatusHints(status) {
        return Transactions.statusHints[status]
    },
    goto(listing) {
     // this.$router.push({ name: 'View listing', params: { lid: listing._id } })
		console.log('asd');
		console.log(this);
    },
	scrollMeTo(refName) {
            // var element = this.$els[refName];
			// element.scrollIntoView();
        },
    changeStatus(status) {
        Meteor.call('statusChangeTransaction', { txId: Session.get('activeTx')._id, status }, (err, res) => {
          if (!err) {
	    			const activeTx = Session.get('activeTx')
			    	Session.set('activeTx', Transactions.findOne(activeTx._id) ) // to trigger reactive ui update
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
  background-color: #FAFAFA;
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

.message-wrapper {
  position: relative;
  padding: 20px;
  background-color: #ffffff;
  margin: 0px;
}
.message-wrapper .message-sideleft {
  vertical-align: top !important;
}
.message-wrapper .message-sideleft[class*="col-"] {
  padding-right: 0px;
  padding-left: 0px;
}
.message-wrapper .message-sideright {
  background-color: #f8f8f8;
}
.message-wrapper .message-sideright[class*="col-"] {
  padding: 30px;
}
.message-wrapper .message-sideright .panel {
  border-top: 1px dotted #DDD;
  padding-top: 20px;
}
.message-wrapper .message-sideright .panel:first-child {
  border-top: none;
  padding-top: 0px;
}
.message-wrapper .message-sideright .panel .panel-heading {
  border-bottom: none;
}
.message-wrapper .panel {
  background-color: transparent !important;
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
.message-wrapper .panel .panel-heading, .message-wrapper .panel .panel-body {
  background-color: transparent !important;
}
.message-wrapper .media .media-body {
  font-weight: 300;
}
.message-wrapper .media .media-heading {
  margin-bottom: 0px;
}
.message-wrapper .media small {
  color: #999999;
  font-weight: 400;
}

.list-message .list-group-item {
  padding: 1em .2em;
}
.list-message .list-group-item.active {
  background-color: #EEEEEE;
  border-bottom: 1px solid #DDD !important;
}
.list-message .list-group-item.active p {
  color: #999999 !important;
}
.list-message .list-group-item.active:hover, .list-message .list-group-item.active:focus, .list-message .list-group-item.active:active {
  background-color: #EEEEEE;
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
.list-message .card-text.tags {
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: calc(1em * 2);
    line-height: 1em;
}
ul.list-group .card.btn {
    padding: 0;
}
.list-group.list-message {
    box-shadow: -1px 1px 2px;
}
ul.list-group span.badge {
    margin: 0;
    padding: 0.3em 0.2em;
    float: right;
    font-size: 1em;
}

</style>
  