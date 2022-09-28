import { Meteor } from 'meteor/meteor';
import Reviews from '../collections/Reviews.js';

Meteor.publish('reviews', function () {
  const user = Meteor.users.findOne(this.userId);
  if (!user) {
    return this.ready();
  }
  return Reviews.find();
});
