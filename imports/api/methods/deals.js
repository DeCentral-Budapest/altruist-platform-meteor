import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import Deals from '../collections/Deals.js';
import Reviews from '../collections/Reviews.js';

Meteor.methods({
  'initiateDeal'(doc) {
    check(doc.listingId, String);
    doc.takenBy = this.userId;
    doc.createdAt = new Date();
    // Messaging
    const msgRecord = { sentBy: this.userId, time: new Date(), status:'inquiry' }
    doc.chat = [msgRecord];
    doc.chatMsgCount = 1;
    // Status
    doc.status = 'inquiry'
    doc.agreedValue = [];
    doc.accepts = [];  // userId
    doc.reviews = {}; // userId: reviewId

    return Deals.insert(doc);
  },
  'statusChangeDeal'(doc) {
    check(doc.dealId, String);
    check(doc.status, String);

    const deal = Deals.findOne(doc.dealId);
    if (!deal) return
    
    if (doc.status === 'accepted') {
      if (_.contains(deal.accepts, this.userId)) return; // Accepting again, when already acepted by this party, should do nothing
      else if (deal.accepts?.length === 0) {  // If other party not yet accepted
        doc.status = 'inquiry';            // then we cannot move to accepted state yet
      }
      console.log('One party accepted,now  waiting for the other one')
      return Deals.update(doc.dealId, { $push: { accepts: this.userId } });
    }

    const msgRecord = { sentBy: this.userId, time: new Date(), status: doc.status }
    console.log('statusChangeDeal', msgRecord)
    return Deals.update(doc.dealId, { $set: { status: doc.status }, $push: { chat: msgRecord }, $inc: { chatMsgCount: 1 } });
  },
  'newChatMessage'(doc) {
    check(doc.dealId, String);
    check(doc.text, String);

    const msgRecord = { sentBy: this.userId, time: new Date(), text: doc.text }
    return Deals.update(doc.dealId, { $push: { chat: msgRecord }, $inc: { chatMsgCount: 1 } });
  },
  'reviewBylister'(doc) {
    check(doc.dealId, String);
    check(doc.rating, Number);
    check(doc.text, String);
    doc.userId = deal.takenBy;
    doc.reviewerId = this.userId;

    const revId = Reviews.insert(doc);
    return Deals.update(doc.dealId, { $set: { listerReview: revId } });
  },
  'reviewByTaker'(doc) {
    check(doc.dealId, String);
    check(doc.rating, Number);
    check(doc.text, String);
    doc.userId = deal.listedBy;
    doc.reviewerId = this.userId;

    const revId = Reviews.insert(doc);
    return Deals.update(doc.dealId, { $set: { takerReview: revId } });
  },
});
