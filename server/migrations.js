import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Migrations } from 'meteor/percolate:migrations';
//import Deals from '/imports/api/collections/Deals.js';

Migrations.add({
    version: 1,
    name: 'Renamed transactions to deals',
    up() {
        const Transactions = new Mongo.Collection('transactions');
        Transactions.rawCollection().rename('deals');
    },
  });

  Meteor.startup(() => {
    Migrations.unlock();
    Migrations.migrateTo('latest');
  });