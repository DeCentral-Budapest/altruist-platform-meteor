import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Listings from '../collections/Listings.js';

Meteor.methods({
  'createListing'(doc) {
    check(doc.title, String);
    check(doc.category, String);
    check(doc.description, String);
    check(doc.tags, String);
    check(doc.isNeed, Boolean);
    doc.status = 'listed';
    doc.createdAt = new Date();
    doc.createdBy = this.userId;

    return Listings.insert(doc);
  },
  'updateListing'(doc) {
    check(doc._id, String);
    check(doc.title, String);
    check(doc.category, String);
    check(doc.description, String);
    check(doc.tags, String);
    check(doc.isNeed, Boolean);

    return Listings.update(doc._id, { $set: doc });
  },
  'removeListing'(id) {
    check(id, String);

    return Listings.remove(id);
  },
});
