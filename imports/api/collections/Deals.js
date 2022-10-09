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
        hint: 'Please discuss details with the other party and press <span class="bg-success text-light">Accept</span> once agreed in every detail.',
        todo: 'Accept',
    },
    canceled: {
        bgClass: 'bg-danger',
        faClass: 'fa-times', 
        hint: 'This <em>Deal</em> has been canceled',
        todo: 'Leave review', // TODO
    },
    accepted: {
        bgClass: 'bg-success',
        faClass:  'fa-check',
        hint: 'This <em>Deal</em> has been accepted. Please deliver the Goods or Services and leave a Review after the <em>Deal</em> has <span class="bg-success text-light">succeded</span> or <span class="bg-danger text-light">failed</a>',
        todo: 'Leave review',
    },
    disputed: {
        bgClass: 'bg-warning',
        faClass:  'fa-exclamation',
        hint: 'This <em>Deal</em> is currently under dispute',
        todo: 'Accept', // TODO +Accept +Cancel
    },
    reviewed: {
        bgClass: 'bg-secondary',
        faClass: 'fa-signature-lock',
        hint: 'This <em>Deal</em> has been reviewed by both parties <span class="text-muted">and <em>Altruism Score</em> was redistributed</span>',
    },
}

export default Deals;
