import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import Listings from '../collections/Listings.js';
import Deals from '../collections/Deals.js';
import Reviews from '../collections/Reviews.js';

Meteor.methods({
  'initiateDeal'(doc) {
    check(doc.listingId, String);
    const listing = Listings.findOne(doc.listingId);
    doc.listedBy = listing.createdBy;
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
    
    const msgRecord = { sentBy: this.userId, time: new Date(), status: doc.status }

    if (doc.status === 'accepted') {
      if (_.contains(deal.accepts, this.userId)) {
        return; // Accepting again, when already acepted by this party, should do nothing
      } else if (deal.accepts?.length === 0) {  // If other party not yet accepted
        doc.status = 'inquiry';            // First accept -- then we cannot move to accepted state yet
      }
      Deals.update(doc.dealId, { $push: { accepts: this.userId } });
    } else if (doc.status === 'reviewed') {
      if (Object.keys(deal.reviews).length < 2) {
        doc.status = 'accepted';            // Both reviews needed --  we cannot move to reviewed state yet
      }
  
    }
    console.log('statusChangeDeal', msgRecord)
    return Deals.update(doc.dealId, { $set: { status: doc.status }, $push: { chat: msgRecord }, $inc: { chatMsgCount: 1 } });
  },
  'newChatMessage'(doc) {
    check(doc.dealId, String);
    check(doc.text, String);

    const msgRecord = { sentBy: this.userId, time: new Date(), text: doc.text }
    return Deals.update(doc.dealId, { $push: { chat: msgRecord }, $inc: { chatMsgCount: 1 } });
  },
  'reviewDeal'(doc) {
    check(doc.dealId, String);
    check(doc.rating, Number);
    check(doc.details, String);
    const deal = Deals.findOne(doc.dealId);
    if (!_.contains([deal.listedBy, deal.takenBy], this.userId)) throw new Meteor.Error('err_notAllowed', 'This user was not a party in this deal.')
    if (_.contains(Object.keys(deal.reviews), this.userId)) throw new Meteor.Error('err_notAllowed', 'Cannot review twice.')
    if (deal.status !== 'accepted') throw new Meteor.Error('err_notAllowed', 'Cannot review deal in this status.')

    doc.reviewedBy = this.userId;
    doc.userId = deal.contraPartyOf(this.userId)._id;
    const reviewId = Reviews.insert(doc);
    Deals.update(doc.dealId, { $set: { [`reviews.${this.userId}`]: reviewId } });

    const statusChangeMethod = Meteor.server.method_handlers['statusChangeDeal'];
    statusChangeMethod.apply({ userId: this.userId }, [{ dealId: doc.dealId, status: 'reviewed' }]);

    return reviewId;
  },
});
