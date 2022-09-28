import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Photos } from '/imports/api/collections/Photos.js';

Meteor.methods({
  'updateAvatar'(path) {
    check(path, String);
    const userId = Meteor.userId();
    const user = Meteor.users.findOne(userId);

    if (user.avatar) {
      Photos.remove({ category: 'userAvatar', path: user.avatar });
    }
    Meteor.users.update(userId, { $set: { avatar: path } });
  },
});