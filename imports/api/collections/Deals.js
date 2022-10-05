import { Mongo } from 'meteor/mongo';

const Deals = new Mongo.Collection('deals');

Deals.statusValues = [
    'inquiry',
    'canceled',
    'accepted',
    'disputed',
    'reviewed'
]

Deals.statusHints = {
    inquiry: 'Please discuss details with the other party and press accept once agreed in every detail.',
    canceled: 'This deal has been canceled',
    accepted: 'This deal has been accepted. Please deliver the goods or services and leave a review after the deal has succeded or failed',
    disputed: 'This deal is currently under dispute',
    reviewed: 'This deal has been reviewed by both parties'
}

Deals.statusTodos = {
    inquiry: 'Accept',
    canceled: '',
    accepted: 'Leave review',
    disputed: '',
    reviewed: ''
}

export default Deals;