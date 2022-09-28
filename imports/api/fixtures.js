import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Listings from './collections/Listings.js';

Meteor.startup(() => {
  // if the Listings collection is empty
  if (Listings.find().count() === 0) {
    const data = [
      {
        title: 'babysitting',
        category: 'services',
        description: 'Available between Mon - Fri 5 PM to 12 PM, and all day on weekends.',
        isNeed: false,
        createdAt: new Date(),
      },
      {
        title: 'apple',
        category: 'goods/food',
        description: 'Jonathan Gold top quality, hand picked with lots of love',
        tags: '#organic',
        isNeed: false,
        createdAt: new Date(),
      },
      {
        title: 'math lessons',
        category: 'services/education',
        description: 'I have a teacher degree and 6 years experience in home schooling. References available upon request.',
        isNeed: false,
        createdAt: new Date(),
      },
      {
        title: 'My awesome band album',
        category: 'virtualgoods/music',
        description: 'A wild fusion of jazz and electro',
        tags:'#jazz #electro',
        isNeed: false,
        createdAt: new Date(),
      },
    ];

    data.forEach(listing => Listings.insert(listing));
  }    
  if (!Meteor.users.findOne({ username: "MrBeast"})) {
    Accounts.createUser({ username: "MrBeast", password: "MrBeast6000" });
  }
});
