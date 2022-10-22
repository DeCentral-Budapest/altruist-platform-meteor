import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Listings from './collections/Listings.js';
import Deals from './collections/Deals.js';

Meteor.startup(() => {
  let demoUserId = Meteor.users.findOne({ username: "MrBeast.demo"})?._id;
  if (!demoUserId) { // TODO remove username.MrBeast from DB
    demoUserId = Accounts.createUser({ username: "MrBeast.demo", password: "MrBeast6000" });
    rootUserId = Accounts.createUser({ username: "root", password: "DefaultRootPassword" });
    Meteor.users.update(demoUserId, { $set:
      {
        nickname: "Jim-Jam",
        realname: "Jimmy Donaldson",
        birth: "05/07/1998",
        region: "Greenville, North Carolina",
        relations: "CJ_Donaldson",
        ascore: 369,
        bio: "I will give you $10,000!",
        web: "https://www.youtube.com/user/MrBeast6000",
        rocketchat: "MrBeast",
        active: 1,
        default_zone: 10,
        invitation: "1stJoinerBy@eaposztrof"
      }
    });
  }

  // if the Listings collection is empty
  const demoListings = Listings.find({ createdBy: demoUserId });
  if (!demoListings.count()) {
    const data = [
      {
        title: 'I will give you <code>$10,000</code>!',
        category: 'goods',
        description: 'I will give <code>$10,000</code>! to those members who reach the <code>369</code> Altruism Score on this amazing platform! <ol class="part in-view" data-startline="338" data-endline="340" data-position="17773" data-size="0"> <li class="" data-startline="331" data-endline="331" data-position="16941" data-size="0"><span data-position="17776" data-size="42">List your Goods &amp; Services and real Needs,</span></li> <li class="" data-startline="332" data-endline="335" data-position="16961" data-size="0"><span data-position="17822" data-size="15">Find real Match</span></li> <li class="" data-startline="333" data-endline="333" data-position="16996" data-size="0"><span data-position="17841" data-size="28">Have successful Deals</span></li> </ol> <hr> <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">   <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>   </symbol>   <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">     <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>   </symbol>   <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">     <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>   </symbol> </svg> <div class="alert alert-warning d-flex align-items-center" role="alert">   <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>   <div>     This is a Demo Listing, and has no relation with <a href="https://www.youtube.com/user/MrBeast6000" target="_blank" class="keychainify-checked">The Real MrBeast</a> (yet 😉)   </div> </div>',
        tags: '$USD !bounty #money #altruizm #goods #services #share #people #community #organization #company #ngo #sme',
        imgURL: '/fixture/hq720.webp',
        isNeed: false,
        createdAt: new Date('2022, 9, 30'),
        createdBy: demoUserId,
      },
      {
        title: 'Another level of philanthropy.',
        category: 'services',
        description: 'Follow me on <a href="https://www.youtube.com/user/MrBeast6000/channels" target="_blank">my channels</a> and reach another level of video creation involving outrageous stunts and philanthropy: <ol><li><strong>Make Your Content Irresistible</strong></li><li><strong>Match Expectations, and then Exceed Them</strong></li><li><strong>Establish a Foundation</strong></li><li><strong>Less can be More</strong></li><li><strong>Get Honest &amp; Knowledgeable Friend Groups</strong></li><li><strong>The Algorithm Reflects the Audience</strong></li></ol>',
        tags: '$USD !bounty #money #altruizm #goods #services #share #people #community #organization #company #ngo #sme',
        isNeed: false,
        createdAt: new Date('2022, 9, 30'),
        createdBy: demoUserId,
      },
      {
        title: '👊 I need You to upload more Resources and Needs',
        category: 'services',
        description: 'More goods & services and real needs from real people, communities or organizations are need to be listed on the site to have an effective network of Altruism.  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">   <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>   </symbol>   <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">     <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>   </symbol>   <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">     <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>   </symbol> </svg> <div class="alert alert-warning d-flex align-items-center" role="alert">   <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>   <div>     This is a Demo Listing, and has no relation with <a href="https://www.youtube.com/user/MrBeast6000" target="_blank" class="keychainify-checked">The Real MrBeast</a> (yet 😉)   </div> </div>',
        tags: '#altruizm #resources #goods #services #share #people #community #organisation #company #ngo #sme',
        imgURL: '/fixture/mqdefault_6s.webp',
        isNeed: true,
        createdAt: new Date('2022, 9, 30'),
        createdBy: demoUserId,
      },
      {
        title: 'I love to have Emeralds',
        category: 'goods',
        description: 'If you have any kind of emeralds in surplus, love to have it.',
        tags: '#emerald #gems #birthstone #stone',
        imgURL: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/22/Emerald_JE2_BE2.png',
        isNeed: true,
        createdAt: new Date('2022, 9, 30'),
        createdBy: demoUserId,
      },
    ];
	  data.forEach(listing => Listings.insert(listing));
  }
});