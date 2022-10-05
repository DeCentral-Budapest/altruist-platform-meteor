import { Meteor } from 'meteor/meteor';
import Deals from '../collections/Deals.js';

Meteor.publish('deals', function () {
  const user = Meteor.users.findOne(this.userId);
  if (!user) {
    return this.ready();
  }
  return Deals.find();
});
