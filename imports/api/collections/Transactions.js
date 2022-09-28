import { Mongo } from 'meteor/mongo';

const Transactions = new Mongo.Collection('transactions');

Transactions.statusHints = {
    inquiry: 'Please discuss details with the other party and press agreed once agreed in every detail.',
    canceled: 'This transaction has been canceled',
    agreed: 'This transaction has been agreed. Please deliver the goods or services and leave a review after the transaction has succeded or failed',
    reviewed: 'This transaction has been reviewed by parties'
}

export default Transactions;