import { Meteor } from 'meteor/meteor';
import Listings from '../collections/Listings.js';

Meteor.publish('listings', function () {
  const user = Meteor.users.findOne(this.userId);
  if (!user) {
    return this.ready();
  }
  return Listings.find();
});
