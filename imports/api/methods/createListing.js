import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Listings from '../collections/Listings.js';

Meteor.methods({
  'createListing'(title, category, description, tags) {
    check(title, String);
    check(category, String);
    check(description, String);
    check(tags, String);

    return Listings.insert({
      title,
      category,
      description,
      tags,
      createdAt: new Date(),
    });
  },
});
