import assert from 'assert';
import { Accounts } from 'meteor/accounts-base';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector'
import Listings from '../collections/Listings.js'
import '../publications/listings.js'

describe('Publish listings', function () {
  let testUserId;
  before(function () {
    testUserId = Accounts.createUser({ username: "testUser", password: "pass" });
  });  
  beforeEach(function () {
    Listings.remove({})
    Listings.insert({
      title: 'Life, universe, everything?',
      category: 'services',
      createdBy: testUserId,
    })
  })
  after(function () {
    Meteor.users.remove({ _id: testUserId });
    Listings.remove({})
  });
  it('sends all listings to logged in user', function (done) {
    assert.equal(Listings.find().count(), 1);
    const collector = new PublicationCollector({ userId: testUserId });
    collector.collect('listings', (collections) => {
      assert.equal(collections.listings.length, 1);
      done();
    })
  })

  it('does not publish to not logged in user', function (done) {
    const collector = new PublicationCollector();
    collector.collect('listings', (collections) => {
      assert.equal(collections.listings, undefined);
      done()
    })
  })
})
