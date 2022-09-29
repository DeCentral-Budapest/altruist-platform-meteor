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
                  <h5>{{listing.title}}</h5>
                    <a v-for="tx in transactionsOf(listing)" href="#" class="list-group-item" @click="setActive(tx)">
                        <h4 class="list-group-item-heading">{{contraPartyOf(tx).username}} <small>{{tx.status}}</small></h4>
                        <p class="list-group-item-text">
                            Says: {{lastMessage(tx)}} <strong>{{whatToDo(tx)}}</strong>
                        </p>
                        <span class="label label-success pull-right">{{tx.createdAt.toLocaleDateString()}}</span>
                        <div class="clearfix"></div>
                    </a>
                </div><!-- /.list-group -->
            </div><!-- /.panel-body -->
        </div><!-- /.panel -->
    </div><!-- /.message-sideleft -->
    <div class="col-md-6 message-panel">
        <Messenger></Messenger>
    </div><!-- /.message-panel -->
    <div v-if="activeTx" class="col-md-3 message-sideright">
      <div class="panel">
            <div class="panel-body">
                <div class="media">
                    <h5>Listed by: {{getUserNameById(activeTx.listedBy)}}</h5>
                    <h5>Taken by: {{getUserNameById(activeTx.takenBy)}}</h5>
                    <h5>Transaction status: {{activeTx.status}}</h5>
                    <small>{{transactionStatusHints(activeTx.status)}}</small>
                    <div v-if="activeTx.status === 'inquiry'">
                        <button class="btn btn-outline-warning" @click="changeStatus('canceled')">Cancel</button>
                        <button class="btn btn-success" @click="changeStatus('accepted')">Accept</button>
                    </div>
                    <div v-else-if="activeTx.status === 'accepted'">
                        <button class="btn btn-outline-warning" @click="changeStatus('disputed')">Dispute</button>
                        <button class="btn btn-success" @click="leaveReview()">Leave Review</button>
                    </div>
                </div>
            </div>
        </div>
    </div><!-- /.message-sideright -->
    <!--div class="col-md-3 message-sideright">
        <div class="panel">
            <div class="panel-heading">
                <div class="media">
                    <a class="pull-left" href="#">
                        <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="sarah tingting" class="img-circle avatar">
                    </a>
                    <div class="media-body">
                        <h4 class="media-heading">Sarah Tingting</h4>
                        <small>Thursday 5th July 2014-via Intercom</small>
                    </div>
                </div>
            </div>
            <div class="panel-body">
                <p class="lead">
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </p>
                <hr>
                <strong>Hi Tol Lee</strong>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
    </div--><!-- /.message-sideright -->
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
        Meteor.call('statusChangeTransaction', { txId: Session.get('activeTx')._id, status })
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
  padding: 0px;
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
  padding: 15px;
  color: #999999 !important;
  border-right: 3px solid #8CC152 !important;
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
</style>
  