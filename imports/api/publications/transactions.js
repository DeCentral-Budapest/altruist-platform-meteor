import { Meteor } from 'meteor/meteor';
import Transactions from '../collections/Transactions.js';

Meteor.publish('transactions', function () {
  const user = Meteor.users.findOne(this.userId);
  if (!user) {
    return this.ready();
  }
  return Transactions.find();
});
