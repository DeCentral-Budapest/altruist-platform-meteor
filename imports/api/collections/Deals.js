import { Mongo } from 'meteor/mongo';

const Deals = new Mongo.Collection('deals');

Deals.statusValues = [
    'inquiry',
    'canceled',
    'accepted',
    'disputed',
    'reviewed'
]

Deals.statusObjects = {
    inquiry: {
        bgClass: 'bg-primary',
        faClass: 'fa-question', 
        hint: 'Please discuss details with the other party and press accept once agreed in every detail.',
        todo: 'Accept',
    },
    canceled: {
        bgClass: 'bg-danger',
        faClass: 'fa-times', 
        hint: 'This deal has been canceled',
    },
    accepted: {
        bgClass: 'bg-success',
        faClass:  'fa-check',
        hint: 'This deal has been accepted. Please deliver the goods or services and leave a review after the deal has succeded or failed',
        todo: 'Leave review',
    },
    disputed: {
        bgClass: 'bg-warning',
        faClass:  'fa-exclamation',
        hint: 'This deal is currently under dispute',
    },
    reviewed: {
        bgClass: '',
        faClass: '',
        hint: 'This deal has been reviewed by both parties',
    },
}


export default Deals;