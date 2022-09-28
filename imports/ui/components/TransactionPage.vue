<template>
    <div>
        <div v-if="this.listing">
          <div class="row">
          <div class="col-md-4">
            <div class="card h-100">
                <img class="card-img-top" @click="goto(this.listing)" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEXv8PL6+/1/ipDz9Pbv7/Dt8PFueYB5g4n2+fzn6eyAiJB8ho16h4+Ai5Ht7vD19felq69zf4bBxsjS19l1gYTm6+yFjpSZnqKYoaR3hId3gYrh4eWytruOlZmUmqBwfILFy8yqsLTvp419AAAEDklEQVR4nO3b63aiMBSG4ZAQwzkqHqptR3v/NzkJtGptcIo6unfW986PWWuolsfEAA6KJPbEs3fgvwch/yDkH4T8g5B/EPIPQv5ByD8I+Qch/yDkH4T8g5B/F4TWKi5Ze5VQCT4pCCEkH4QQ0g9CCOkHIYT0gxBC+kEIIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDS75FCrW/a1SsfjjG8mzDVrvSWuicQoiEpdD+fJNntuZ0SaiTxUWOo15N7tB7/XnyIUDf2xZjNZmNuyT98+zJ2CB8kVLksX0Uq9I29VjIf+0Z80CzNZaX0jUcLv7deOPJZHicc+5BgTpiOfAgzYVnkYx8CIYS/DMKT+hVXh48JMQi1sCLPhQ0vmVEIs7d6Z97bLLg1BmH2ZyaLSu7mNrQ1AqGaz4qikLWc5KFfEoFQ/KkK6du+hQYxBuGqqjth9RHrGL5XshfGOob2bSu7aTppYx3DxjhhXZt1Etoag9DmcmG2k2kWvNKNQahV0s73eRLvOY03Wjt0IR+H8FLMhGr8h5KMhKoRqp2GT68vxEjYCNua2TR4SLgQH6EWWWuk9MShz87S0GrDSJh4oKxn0ywNE7t/VfZsKx+hbRelu0SS9WI6cDXvP85Qr/OMqdAB+/NrWZvB5UarvD6/EOYitO1GylNiYBjdCOarH9f6LIRa2+49eMgtN+n5oqLdTy1X/kJqts/E8RVgIUyPU/SzxTRwFprqsnQj7BajeXJcVTkIm8wBi2/C6vy4qN17sFlUlRdKN1GPWzkIk3ZRnAk98fuCkqrl10T+HEUuQv1zivYMf1zs56L/K7V5XZ1sNp6YshCmZ4vMQSjN9Hhw96uoqU+3H1ZU2kLVHyaKENGN0+dxsRvBrw/cDq/Abm/pC1XTAesw0BOTXqiWdfnjp3b7hLqwdCeZrRkawf696BFuFTXnI+j/9CsqVaHuhLadDfI6x8JfaailO2MNvgBzd9SkKuzG0K2iVWjXv42issuiGpjIWzeKlIV18DBxlvnIV8ER9FWLeeaEJO/F8LP0V9WlHB7noprNa6pjmP5S+A+/LGVB9I6h+wi709TIhdILR8ZQSHMMl/cCFsH//H6+UNxROPZXc5ulRNdSd1m4Dl41jc6sLc17hFPV3Ok+bzHwAfKThf29+smNt+v3O9XQXGn8zLrL9y0E1e9bPLPHCfUdvvd0zRNgDCGkH4QQ0g9CCOkHIYT0gxBC+kEIIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDSD8Jw1iouWXuVMJIg5B+E/IOQfxDyD0L+Qcg/CPkHIf8g5B+E/IOQfxDyL37hX1Wmjti02vgMAAAAAElFTkSuQmCC" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title" @click="goto(this.listing)">{{this.listing.title}}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{this.listing.category}}</h6>
                    <p class="card-text">{{this.listing.description}}</p>
                    <p class="card-text"><small class="text-muted">{{this.listing.tags}}</small></p>
                </div>
            </div>
          </div>
          <div class="col-md-4">
            <h5>Tansaction status: {{this.status}}</h5>
            <small>{{transactionStatusHints(this.status)}}</small>
            <div v-if="this.status === 'inquiry'">
                <button class="btn btn-outline-warning" @click="cancelTrasactiom()">Cancel</button>
                <button class="btn btn-success" @click="agreeTrasactiom()">Agree</button>
            </div>
            <div v-else-if="this.status === 'agreed'">
                <button class="btn btn-success" @click="reviewTransaction()">Leave Review</button>
            </div>
            <h5>Listed by: {{getUserNameById(this.listedBy)}}</h5>
            <h5>Taken by: {{getUserNameById(this.takenBy)}}</h5>
          </div>
          <div class="col-md-4">
            <h5>Chat history</h5>
            <div class="row">
                <div v-if="this.chat.length === 0">
                    <small>No messages exchnaged. Let's break the ice!</small>
                </div>
                <div v-for="item in this.chat">
                    {{getUserNameById(item.sentBy)}}: {{item.text}}
                </div>
                <div>
                    <!--label for="message" class="form-label">Message the other party</label-->
                    <textarea class="form-control" id="message" rows="5" v-model="message"></textarea>
                    <button type="submit" class="btn btn-primary"  data-bs-dismiss="modal" @click="sendMessage()">Send</button>
                </div>
            </div>
          </div>
        </div>
        </div>
        <div v-else>Not found</div>
    </div>
</template>

<script>
import Listings from '../../api/collections/Listings'
import Transactions from '../../api/collections/Transactions'

export default {
  data() {
    const txId = this.$route.params.tid
    let tx = Transactions.findOne(txId)
    if (!tx) tx = { listing: null }
    else {
      const listing = Listings.findOne(tx.listingId)
      tx.listing = listing
      tx.txId = tx._id
    }
    tx.message = ''
    console.log("tx", tx)
    return tx
  },
  props: {
  },
  meteor: {
  },
  methods: {
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
    cancelTrasactiom() {
        Meteor.call('statusChangeTransaction', { txId: this.txId, status: 'canceled' })
    },
    agreeTrasactiom() {
        Meteor.call('statusChangeTransaction', { txId: this.txId, status: 'agreed' })
    },
    reviewTrasactiom() {
    },
    sendMessage() {
        Meteor.call('sendMessage', { txId: this.txId, text: this.message }, (err, res) => {
            if (!err) {
                this.message = ''
            }
        })
    },
  },
}
</script>
  
<style scoped>
</style>
  