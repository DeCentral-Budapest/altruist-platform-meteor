import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Listings from '../collections/Listings.js';

Meteor.methods({
  'createListing'(title, category, description, tags, isNeed) {
    check(title, String);
    check(category, String);
    check(description, String);
    check(tags, String);
    check(isNeed, Boolean);

    return Listings.insert({
      title,
      category,
      description,
      tags,
      isNeed,
      createdAt: new Date(),
      createdBy: this.userId,
    });
  },
  'removeListing'(id) {
    check(id, String);

    return Listings.remove(id);
  },
});
