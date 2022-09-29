<template>
<div>
  <div class="row message-wrapper rounded shadow mb-20">
    <div class="col-md-3 message-sideleft">
      <div class="panel">
        <div class="panel-heading">
          <h3 class="panel-title">{{this.showAll ? 'All Transactions' : 'Inbox'}}</h3>
          <div class="pull-right">
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
                <p class="card-text" v-html="listing.description"></p>
                <p class="card-text"><small class="text-muted">{{listing.tags}}</small></p>
                <p class="card-text"><small class="text-muted">{{listing.offer}}</small></p>
              <!--/div>
              <div class="card-footer"-->
                <ul class="list-group list-group-flush">
                  <li v-for="tx in transactionsOf(listing)" class="list-group-item" @click="setActive(tx)">
                    <h4 class="list-group-item-heading">{{contraPartyOf(tx).username}} <small class="float-end">{{tx.createdAt.toLocaleDateString()}}</small></h4>
                    <p class="list-group-item-text">
                        {{lastMessage(tx)}} <strong class="float-end">{{whatToDo(tx)}}</strong>
                    </p>
                    <span class="badge bg-primary float-end">{{tx.status}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div><!-- /.listing -->
        </div><!-- /.panel-body -->
      </div><!-- /.panel -->
    </div><!-- /.message-sideleft -->
    <div class="col-md-6 message-panel">
        <Messenger></Messenger>
    </div><!-- /.message-panel -->
    <div v-if="activeTx" class="col-md-3 message-sideright">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title text-uppercase btn-outline-secondary">{{activeTx.status}}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Listed by: {{getUserNameById(activeTx.listedBy)}}</h6>
          <h6 class="card-subtitle mb-2 text-muted">Taken by: {{getUserNameById(activeTx.takenBy)}}</h6>
          <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <small>{{transactionStatusHints(activeTx.status)}}</small>
              </li>
              <li class="list-group-item">
                <div v-if="activeTx.status === 'inquiry'">
                    <button class="btn btn-outline-warning" @click="changeStatus('canceled')">Cancel</button>
                    <button class="btn btn-success" @click="changeStatus('accepted')">Accept</button>
                </div>
                <div v-else-if="activeTx.status === 'accepted'">
                    <button class="btn btn-outline-warning" @click="changeStatus('disputed')">Dispute</button>
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
      if (lastMsg.text) return 'Says: '+ lastMsg.text.substr(0, 20)
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
      this.$router.push({ name: 'View listing', params: { lid: listing._id } })
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

</style>
  