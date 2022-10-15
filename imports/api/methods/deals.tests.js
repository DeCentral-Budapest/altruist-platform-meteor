import { Meteor } from 'meteor/meteor';
import assert from 'assert';
import Listings from '../collections/Listings.js';
import Deals from '../collections/Deals.js';
import './deals.js';

function callMethod(methodName, ...params) {
  const method = Meteor.server.method_handlers[methodName];
  return method.apply(...params);
}

if (Meteor.isServer) {
  describe('method: deals', function () {
    let testUserIdA;
    let testUserIdB;
    before(function () {
      testUserIdA = Accounts.createUser({ username: "testUserA", password: "pass" });
      testUserIdB = Accounts.createUser({ username: "testUserB", password: "pass" });
    });
    after(function () {
      Meteor.users.remove({ _id: testUserIdA });
      Meteor.users.remove({ _id: testUserIdB });
      Deals.remove({});
    });
    beforeEach(function () {
    });
    afterEach(function () {
    });

    describe('deal lifecycle', function () {
      let listingId;
      let dealId;
      it('can inquiry', function () {
        listingId = callMethod('createListing', { userId: testUserIdA }, [{ title: 'apple', description: 'Freshly picked', tags: '#fruit', isNeed: false }]);
        assert.equal(Deals.find().count(), 0);

        dealId = callMethod('initiateDeal', { userId: testUserIdB }, [{ listingId }]);
        assert.equal(Deals.find({ listingId }).count(), 1);

        const deal = Deals.findOne(dealId);
        assert.equal(deal.listingId, listingId);
        assert.equal(deal.listedBy, testUserIdA);
        assert.equal(deal.takenBy, testUserIdB);
        assert.equal(deal.status, 'inquiry');
        assert.equal(deal.chatMsgCount, 1);
      });

      it('can accept an inquiry', function () {
        callMethod('statusChangeDeal', { userId: testUserIdA }, [{ dealId, status: 'accepted' }]);

        const deal = Deals.findOne(dealId);
        assert.equal(deal.status, 'inquiry');  // still in inquiry, needs other party to accept as well
        assert.equal(deal.chatMsgCount, 2);
      });

      it('same user cannot accept twice', function () {
        callMethod('statusChangeDeal', { userId: testUserIdA }, [{ dealId, status: 'accepted' }]);

        const deal = Deals.findOne(dealId);
        assert.equal(deal.status, 'inquiry');
        assert.equal(deal.chatMsgCount, 2);   // did not increase
      });

      it('both can accept an inquiry', function () {
        callMethod('statusChangeDeal', { userId: testUserIdB }, [{ dealId, status: 'accepted' }]);

        const deal = Deals.findOne(dealId);
        assert.equal(deal.status, 'accepted');
        assert.equal(deal.chatMsgCount, 3);
      });

      it('can comment on a deal', function () {
        callMethod('newChatMessage', { userId: testUserIdA }, [{ dealId, text: 'I would like it' }]);

        const deal = Deals.findOne(dealId);
        assert.equal(deal.chatMsgCount, 4);
      });
    });
  });
}
