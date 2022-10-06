import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Deals from '../collections/Deals.js';
import Reviews from '../collections/Reviews.js';

Meteor.methods({
  'initiateDeal'(doc) {
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

    return Deals.insert(doc);
  },
  'statusChangeDeal'(doc) {
    check(doc.txId, String);
    check(doc.status, String);

    const msgRecord = { sentBy: this.userId, time: new Date(), status: doc.status }
    console.log('statusChangeDeal', msgRecord)
    return Deals.update(doc.txId, { $set: { status: doc.status }, $push: { chat: msgRecord }, $inc: { chatMsgCount: 1 } });
  },
  'newChatMessage'(doc) {
    check(doc.txId, String);
    check(doc.text, String);

    const msgRecord = { sentBy: this.userId, time: new Date(), text: doc.text }
    return Deals.update(doc.txId, { $push: { chat: msgRecord }, $inc: { chatMsgCount: 1 } });
  },
  'reviewBylister'(doc) {
    check(doc.txId, String);
    check(doc.rating, Number);
    check(doc.text, String);
    doc.userId = tx.takenBy;
    doc.reviewerId = this.userId;

    const revId = Reviews.insert(doc);
    return Deals.update(doc.txId, { $set: { listerReview: revId } });
  },
  'reviewByTaker'(doc) {
    check(doc.txId, String);
    check(doc.rating, Number);
    check(doc.text, String);
    doc.userId = tx.listedBy;
    doc.reviewerId = this.userId;

    const revId = Reviews.insert(doc);
    return Deals.update(doc.txId, { $set: { takerReview: revId } });
  },
});
