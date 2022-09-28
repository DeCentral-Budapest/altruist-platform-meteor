import { Meteor } from 'meteor/meteor';
import assert from 'assert';
import Listings from '../collections/Listings.js';
import '../methods/listings.js';

if (Meteor.isServer) {
  describe('method: listings', function () {
    beforeEach(function () {
      Listings.remove({});
    });

    it('can createListing', function () {
      const addListing = Meteor.server.method_handlers['createListing'];

      addListing.apply({}, ['babysitting', 'services']);

      assert.equal(Listings.find().count(), 1);
    });
  });
}
