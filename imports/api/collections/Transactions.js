import { Mongo } from 'meteor/mongo';

const Transactions = new Mongo.Collection('transactions');

Transactions.statusValues = [
    'inquiry',
    'canceled',
    'accepted',
    'disputed',
    'reviewed'
]

Transactions.statusHints = {
    inquiry: 'Please discuss details with the other party and press accept once agreed in every detail.',
    canceled: 'This transaction has been canceled',
    accepted: 'This transaction has been accepted. Please deliver the goods or services and leave a review after the transaction has succeded or failed',
    disputed: 'This transaction is currently under dispute',
    reviewed: 'This transaction has been reviewed by both parties'
}

Transactions.statusTodos = {
    inquiry: 'Accept',
    canceled: '',
    accepted: 'Leave review',
    disputed: '',
    reviewed: ''
}

export default Transactions;