import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Listings from '../collections/Listings.js';

Meteor.methods({
  'createListing'(title, category) {
    check(title, String);
    check(category, String);

    return Listings.insert({
      title,
      category,
      createdAt: new Date(),
    });
  },
});
