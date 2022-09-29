<template>
    <div class="modal fade" id="listingModal" tabindex="-1" aria-labelledby="listingModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <form @submit.prevent="submit($event)">
        <div class="modal-content"> 
        <div class="modal-header">
            <h5 class="modal-title" id="listingModalLabel">{{getTitle()}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" v-model="title" required>
                </div>
                <div class="mb-3">
                	<div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="formURLorFile" v-model="checked">
                    <label class="form-check-label" for="formURLorFile">Switch to <i>{{(checked)?"URL":"File"}}</i> upload</label>
                	</div>
                  <div v-if="!checked" class="form-url">
                    <input class="form-control form-control-url" type="text" id="imgURL" v-model="imgURL" placeholder='https://i.imgur.com/e8PooMD.png'>
                    <div class="form-text">Use publicly available images only (ex: <code>https://i.imgur.com/e8PooMD.png</code>)</div>
                  </div>
                	<div v-if="checked" class="form-file">
                    <a href="#" class="btn btn-sm btn-outline-secondary" @click="photoUpload">Upload image</a>
                    <span v-if="fileName">{{fileName}} uploaded</span>
                    <div class="form-text">File size limit applied on this server.</div>
                	</div>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" rows="3" v-model="description"></textarea>
                </div>
                <div class="mb-3">
                    <label for="tags" class="form-label">Tags</label>
                    <input type="text" class="form-control" id="tags" aria-describedby="tagsHelp" v-model="tags">
                    <div id="tagsHelp" class="form-text">Use hashtags, separated by spaces.</div>
                </div>
                <div class="mb-3">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="goods" v-model="picked">
                    <label class="form-check-label" for="inlineRadio1">Goods</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="services" v-model="picked">
                    <label class="form-check-label" for="inlineRadio2">Services</label>
                  </div>
              	<div class="form-check form-check-inline form-switch">
                    <input class="form-check-input" type="checkbox" id="formIsNeed" v-model="isNeed">
                    <label class="form-check-label" for="formIsNeed">It's a Need</label>
              	</div>
          </div>
        </div>
        <div class="modal-footer">            
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
        </div> 
        </form>
    </div>
    </div>
</template>


<script>
import bootstrap from 'bootstrap';
import { Photos } from '../../api/collections/Photos';

export default {
  data() {
    return {
      title: "",
      description: "",
      tags: "",
      isNeed: false,
      imgURL: "",
      picked: "",
      checked: "",
      fileName: "",
    }
  },
  mounted: function() {
    const self = this;
    const myModal = document.getElementById('listingModal');
    myModal.addEventListener('shown.bs.modal', function () {
      const l = Session.get('listing')
      if (!l) return;
      self.title = l.title;
      self.description = l.description;
      self.tags = l.tags;
      self.isNeed = l.isNeed;
      self.imgURL = l.imgURL;
      self.picked = l.offer;
      self.getTitle();
    })
    myModal.addEventListener('hidden.bs.modal', function () {
      Session.set('listing', null);
      self.title = '';
      self.imgURL = '';
      self.description = '';
      self.tags = '';
      self.isNeed = false;
      self.picked = '';
      self.fileName = '';
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
      const l = Session.get('listing')
      const method = l ? 'updateListing' : 'createListing'
      const doc = {
        title: this.title,
        imgURL: this.imgURL,
        description: this.description,
        tags: this.tags,
        isNeed: this.isNeed,
        offer: this.picked,
      }
      if (l) doc._id = l._id;
      Meteor.call(method, doc, (error) => {
        if (error) {
          alert(error.error)
        } else {
          const listingModal = document.getElementById('listingModal');
          const modal = bootstrap.Modal.getInstance(listingModal);    
          modal.hide();
        }
      })
    },
    getTitle() {
      const l = Session.get('listing')
      if (!l) return "Create your listing!"
      return l.title
    },
    photoUpload () {
      const self = this;
      Photos.upload(
        { category: 'listing' },
        function oncomplete(file) {
          self.imgURL = file.path;
          self.fileName = file.name;
      });
    },
  },
}
</script>

<style>
</style>
