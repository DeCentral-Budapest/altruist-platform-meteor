import { Meteor } from 'meteor/meteor';
import Listings from '../collections/Listings.js';

Meteor.publish('listings', function () {
  return Listings.find();
});
