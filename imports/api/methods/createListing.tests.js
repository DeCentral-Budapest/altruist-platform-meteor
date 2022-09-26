import { Meteor } from 'meteor/meteor';
import assert from 'assert';
import Listings from '../collections/Listings.js';
import '../methods/createListing.js';

if (Meteor.isServer) {
  describe('method: createListing', function () {
    beforeEach(function () {
      Listings.remove({});
    });

    it('can add a new listing', function () {
      const addListing = Meteor.server.method_handlers['createListing'];

      addListing.apply({}, ['babysitting', 'services']);

      assert.equal(Listings.find().count(), 1);
    });
  });
}
