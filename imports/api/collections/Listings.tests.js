// Tests for the behavior of the listings collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import assert from 'assert';
import Listings from './Listings.js';

if (Meteor.isServer) {
  describe('listings collection', function () {
    it('insert correctly', function () {
      const id = Listings.insert({
        title: 'Life, universe, everything?',
        category: 'services',
      });
      const added = Listings.find({ _id: id });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'listings');
      assert.equal(count, 1);
    });
  });
}
