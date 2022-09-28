import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Transactions from '../collections/Transactions.js';
import Reviews from '../collections/Reviews.js';

Meteor.methods({
  'initiateTransaction'(doc) {
    check(doc.listingId, String);
    doc.takenBy = this.userId;
    doc.status = 'inquiry'
    doc.chat = [];
    doc.agreedValue = [];
    doc.listerReview = null;
    doc.takerReview = null;
    doc.createdAt = new Date();

    return Transactions.insert(doc);
  },
  'addChat'(doc) {
    check(doc.txId, String);
    check(doc.text, String);

    return Transactions.update(doc.txId, { $push: { chat: text } });
  },
  'statusChangeTransaction'(doc) {
    check(doc.txId, String);
    check(doc.status, String);

    return Transactions.update(doc.txId, { $set: { status: doc.status } });
  },
  'sendMessage'(doc) {
    check(doc.txId, String);
    check(doc.text, String);

    const msgRecord = { sentBy: this.userId, text: doc.text }
    return Transactions.update(doc.txId, { $push: { chat: msgRecord } });
  },
  'reviewBylister'(doc) {
    check(doc.txId, String);
    check(doc.rating, Number);
    check(doc.text, String);
    doc.userId = tx.takenBy;
    doc.reviewerId = this.userId;

    const revId = Reviews.insert(doc);
    return Transactions.update(doc.txId, { $set: { listerReview: revId } });
  },
  'reviewByTaker'(doc) {
    check(doc.txId, String);
    check(doc.rating, Number);
    check(doc.text, String);
    doc.userId = tx.listedBy;
    doc.reviewerId = this.userId;

    const revId = Reviews.insert(doc);
    return Transactions.update(doc.txId, { $set: { takerReview: revId } });
  },
});
