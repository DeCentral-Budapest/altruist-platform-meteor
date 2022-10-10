import { Meteor } from 'meteor/meteor';
import Deals from '../collections/Deals.js';

Meteor.publish('dealsOfUser', function () {
  const user = Meteor.users.findOne(this.userId);
  if (!user) {
    return this.ready();
  }
  return Deals.find({ $or: [ { listedBy: this.userId }, { takenBy: this.userId } ] });
});
