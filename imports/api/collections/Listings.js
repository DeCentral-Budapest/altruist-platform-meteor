import { Mongo } from 'meteor/mongo';

const Listings = new Mongo.Collection('listings');

Listings.statusValues = [
    'private',
    'listed',
    'canceled',
    'suspended',
    'archived',
]

export default Listings;