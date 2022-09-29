import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Listings from './collections/Listings.js';
import Transactions from './collections/Transactions.js';

Meteor.startup(() => {
  let demoUserId = Meteor.users.findOne({ username: "MrBeast.demo"})?._id;
  if (!demoUserId) { // TODO remove username.MrBeast from DB
    demoUserId = Accounts.createUser({ username: "MrBeast.demo", password: "MrBeast6000" });
    Meteor.users.update(demoUserId, { $set:
      { nickname: "Jim-Jam",
      realname: "Jimmy Donaldson",
      birth: "05/07/1998",
      region: "Greenville, North Carolina",
      relations: "CJ_Donaldson",
      ascore: 369,
      bio: "I will give you $10,000!",
      web: "https://mrbeast.fandom.com/wiki/MrBeast",
      rocketchat: "MrBeast",
      active: 1,
      default_zone: 10,
      invitation: "1stJoinerBy@eaposztrof" }
    });
  }

  // if the Listings collection is empty
  const oldListings = Listings.find({ 'createdBy.username': { $exists: true } });
  if (oldListings) {
    // Listings.remove({});
   // Transactions.remove({});
    oldListings.forEach((l) => {
      Transactions.remove({ listingId: l._id });
      Listings.remove({ id: l._id });
    })
    const data = [
      {
        title: 'babysitting',
        category: 'services',
        description: 'Available between Mon - Fri 5 PM to 12 PM, and all day on weekends.',
        isNeed: false,
        createdAt: new Date(),
        createdBy: demoUserId,
      },
      {
        title: 'apple',
        category: 'goods/food',
        description: 'Jonathan Gold top quality, hand picked with lots of love',
        tags: '#organic',
        isNeed: false,
        createdAt: new Date(),
        createdBy: demoUserId,
      },
      {
        title: 'math lessons',
        category: 'services/education',
        description: 'I have a teacher degree and 6 years experience in home schooling. References available upon request.',
        isNeed: false,
        createdAt: new Date(),
        createdBy: demoUserId,
      },
      {
        title: 'My awesome band album',
        category: 'virtualgoods/music',
        description: 'A wild fusion of jazz and electro',
        tags:'#jazz #electro',
        isNeed: false,
        createdAt: new Date(),
        createdBy: demoUserId,
      },
    ];

    data.forEach(listing => Listings.insert(listing));
  }
});
