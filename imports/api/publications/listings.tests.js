import assert from 'assert';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector'
import Listings from '../collections/Listings.js'
import '../publications/listings.js'

describe('Publish listings', function () {
  beforeEach(function () {
    Listings.remove({})
    Listings.insert({
      title: 'babysittings',
      category: 'services'
    })
  })

  it('sends all listings', function (done) {
    const collector = new PublicationCollector()
    collector.collect('listings', (collections) => {
      assert.equal(collections.listings.length, 1)
      done()
    })
  })
})
