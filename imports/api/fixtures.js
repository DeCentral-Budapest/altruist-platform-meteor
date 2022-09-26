import { Meteor } from 'meteor/meteor';
import Listings from './collections/Listings.js';

Meteor.startup(() => {
  // if the Listings collection is empty
  if (Listings.find().count() === 0) {
    const data = [
      {
        title: 'babysitting',
        category: 'services',
        createdAt: new Date(),
      },
      {
        title: 'apple',
        category: 'goods',
        createdAt: new Date(),
      },
      {
        title: 'math lessons',
        category: 'services/education',
        createdAt: new Date(),
      },
      {
        title: 'My awesome band album',
        category: 'virtual/audio',
        description: 'A wild fusion of jazz and electro',
        createdAt: new Date(),
      },
    ];

    data.forEach(listing => Listings.insert(listing));
  }
});
