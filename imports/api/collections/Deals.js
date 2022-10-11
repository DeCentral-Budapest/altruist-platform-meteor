import { Mongo } from 'meteor/mongo';
import { MeteorData } from 'vue-meteor-tracker';

const Deals = new Mongo.Collection('deals');

Deals.helpers({
  sideOf(userId) {
    if (userId === this.createdBy) return 'lister'
    else if (userId === this.takenBy) return 'taker'
    return undefined
  },
  getStatusObject(status, userId = Meteor.userId()) {
    let statusObj = Deals.statusObjects[status]
//    if (typeof obj === 'function') obj = obj(this.sideOf(userId), this.isNeed)
    if (status === 'inquiry' && this.accepts?.length === 1) { // This is the special status, when it is half accepted, but not by both
        if (this.accepts[0] === userId) {
            statusObj.hint = 'This deal has been accepted by you. It is awaiting the accept of the other party.'
            statusObj.todo = 'Awaiting other party'
        } else {
            statusObj.hint = 'The other party already Accepted the conditions. It is awaiting your accept to finalize.'
            statusObj.todo = 'Accept'
        }
        const acceptedSide = this.sideOf(this.accepts[0])
        if(this.isNeed) {
            if(acceptedSide === 'lister') {
              statusObj.label = 'approved'
            }
            if(acceptedSide === 'taker') {
              statusObj.label = 'offer'
            }
        } else {
            if(acceptedSide === 'lister') {
              statusObj.label = 'approved'
            }
            if(acceptedSide === 'taker') {
              statusObj.label = 'request'
            }
        }
    }
    return statusObj;
  },
});

Deals.statusValues = [
  'inquiry',
  'canceled',
  'accepted', //  'confirmed',
  'disputed',
  'reviewed', //  'finished'
]

Deals.statusObjects = {
    inquiry: {
        bgClass: 'bg-primary',
        faClass: 'fa-question', 
        hint: 'Please discuss details with the other party and press <span class="bg-success text-light inline">Accept</span> once agreed in every detail.',
        todo: 'Accept',
    },
    canceled: {
        bgClass: 'bg-danger',
        faClass: 'fa-times', 
        hint: 'This <em>Deal</em> has been <span class="bg-danger text-light inline">Canceled</span>',
        todo: 'Leave review', // TODO
    },
    accepted: {
        bgClass: 'bg-success',
        faClass:  'fa-check',
        hint: 'This <em>Deal</em> has been <span class="bg-success text-light inline">Accepted</span> by both parties. Please deliver the Goods or Services and leave a <span class="bg-info text-light inline">Review</span> after the <em>Deal</em> has <span class="text-success inline">succeded</span> or <span class="text-danger inline">failed</a>',
        todo: 'Leave review',
    },
    disputed: {
        bgClass: 'bg-warning',
        faClass:  'fa-exclamation',
        hint: 'This <em>Deal</em> is currently under <em>Dispute</em>',
        todo: 'Accept', // TODO +Accept +Cancel
    },
    reviewed: {
        bgClass: 'bg-info',
        faClass: 'fa-signature-lock',
        hint: 'This <em>Deal</em> has been reviewed by both parties <span class="text-muted inline">and <em>Altruism Score</em> was redistributed</span>',
    },
}

export default Deals;

