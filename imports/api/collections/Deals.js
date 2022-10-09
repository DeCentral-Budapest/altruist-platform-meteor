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
        hint: 'This <em>Deal</em> has been <span class="bg-success text-light inline">Accepted</span>. Please deliver the Goods or Services and leave a <span class="bg-info text-light inline">Review</span> after the <em>Deal</em> has <span class="text-success inline">succeded</span> or <span class="text-danger inline">failed</a>',
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
