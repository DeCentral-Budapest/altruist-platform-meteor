import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function () {
  const user = Meteor.users.findOne(this.userId);
  if (!user) {
    return this.ready();
  }
  return Meteor.users.find({}, { fields: { services: 0 }});
});