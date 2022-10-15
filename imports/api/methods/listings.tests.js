import { Meteor } from 'meteor/meteor';
import assert from 'assert';
import Listings from '../collections/Listings.js';
import './listings.js';

if (Meteor.isServer) {
  describe('method: listings', function () {
    let testUserId;
    before(function () {
      testUserId = Accounts.createUser({ username: "testUser", password: "pass" });
    });
    beforeEach(function () {
      Listings.remove({});
    });
    after(function () {
      Meteor.users.remove({ _id: testUserId });
      Listings.remove({});
    });

    it('can createListing', function () {
      const createListing = Meteor.server.method_handlers['createListing'];
      createListing.apply({ userId: testUserId }, [{ title: 'apple', description: '', tags: '#fruit', isNeed: false }]);
      assert.equal(Listings.find().count(), 1);
    });
  });
}
