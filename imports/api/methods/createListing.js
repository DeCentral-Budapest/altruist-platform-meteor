import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Listings from '../collections/Listings.js';

Meteor.methods({
  'createListing'(title, category, description) {
    check(title, String);
    check(category, String);
    check(description, String);

    return Listings.insert({
      title,
      category,
      description,
      createdAt: new Date(),
    });
  },
});
