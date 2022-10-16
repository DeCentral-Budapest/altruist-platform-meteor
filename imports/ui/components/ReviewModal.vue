<template>
    <div class="modal fade" id="reviewModal" tabindex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <form @submit.prevent="submit($event)">
        <div class="modal-content"> 
        <div class="modal-header">
            <h5 class="modal-title" id="reviewModalLabel">{{getTitle()}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="mb-3">
                <label for="rating" class="form-label">Rating</label>
                <input type="number" class="form-control" id="title" v-model="rating" placeholder="How would you rate this deal" min="1" max="5" required>
            </div>
            <div class="mb-3">
                <label for="title" class="form-label">Details</label>
                <input type="text" class="form-control" id="title" v-model="details" placeholder="Details about your experience">
            </div>
        </div>
        <div class="modal-footer">            
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" title="Submitting the review">Submit</button>
        </div>
        </div> 
        </form>
    </div>
    </div>
</template>


<script>
import bootstrap from 'bootstrap';
import Deals from '/imports/api/collections/Deals';

export default {
  data() {
    return {
      rating: 0,
      details: "",
    }
  },
  mounted: function() {
    const self = this;
    const myModal = document.getElementById('reviewModal');
    myModal.addEventListener('shown.bs.modal', function () {
      self.getTitle();
    })
    myModal.addEventListener('hidden.bs.modal', function () {
    })
  },
  meteor: {
    currentUser () {
        return Meteor.user();
    },
  },
  methods: {
    submit(event) {
      event.preventDefault()
      const doc = {
        dealId: Session.get('activeDeal')._id,
        rating: Number(this.rating),
        details: this.details,
      }
      Meteor.call('reviewDeal', doc, (error) => {
        if (error) {
          alert(error.error)
        } else {
          const reviewModal = document.getElementById('reviewModal');
          const modal = bootstrap.Modal.getInstance(reviewModal);    
          modal.hide();
          const activeDeal = Session.get('activeDeal')
			    Session.set('activeDeal', Deals.findOne(activeDeal._id) ) // to trigger reactive ui update
        }
      })
    },
    getTitle() {
      let activeDeal = Session.get('activeDeal');
      if (!activeDeal) return "How did this deal go?";
      activeDeal = Deals._transform(activeDeal);
      const contraParty = activeDeal.contraPartyOf(Meteor.userId());
      return "How did this deal go with " + contraParty.username + "?"
    },
  },
}
</script>

<style>
</style>
