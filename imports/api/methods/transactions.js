import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Transactions from '../collections/Transactions.js';
import Reviews from '../collections/Reviews.js';

Meteor.methods({
  'initiateTransaction'(doc) {
    check(doc.listingId, String);
    doc.takenBy = this.userId;
    doc.status = 'inquiry'
    const msgRecord = { sentBy: this.userId, time: new Date(), status:'inquiry' }
    doc.chat = [msgRecord];
    doc.chatMsgCount = 1;
    doc.agreedValue = [];
    doc.listerReview = null;
    doc.takerReview = null;
    doc.createdAt = new Date();

    return Transactions.insert(doc);
  },
  'statusChangeTransaction'(doc) {
    check(doc.txId, String);
    check(doc.status, String);

    const msgRecord = { sentBy: this.userId, time: new Date(), status: doc.status }
    console.log('statusChangeTransaction', msgRecord)
    return Transactions.update(doc.txId, { $set: { status: doc.status }, $push: { chat: msgRecord }, $inc: { chatMsgCount: 1 } });
  },
  'newChatMessage'(doc) {
    check(doc.txId, String);
    check(doc.text, String);

    const msgRecord = { sentBy: this.userId, time: new Date(), text: doc.text }
    return Transactions.update(doc.txId, { $push: { chat: msgRecord }, $inc: { chatMsgCount: 1 } });
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
