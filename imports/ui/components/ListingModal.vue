<template>
    <div class="modal fade" id="listingModal" tabindex="-1" aria-labelledby="listingModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="listingModalLabel">{{getTitle()}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form>
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" v-model="title" required>
                </div>
                <div class="mb-3">
                    <label for="category" class="form-label">Category</label>
                    <input type="text" class="form-control" id="category" v-model="category" required>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" rows="5" v-model="description"></textarea>
                </div>  
                <div class="mb-3">
                    <label for="tags" class="form-label">Tags</label>
                    <input type="text" class="form-control" id="tags" aria-describedby="tagsHelp" v-model="tags">
                    <div id="tagsHelp" class="form-text">Use hashtags, separated by spaces.</div>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="need" v-model="isNeed">
                    <label class="form-check-label" for="need">It is a Need</label>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary"  data-bs-dismiss="modal" @click="submit($event)">Submit</button>
        </div>
        </div>
    </div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      title: "",
      category: "",
      description: "",
      tags: "",
      isNeed: false,
    }
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
        category: this.category,
        description: this.description,
        tags: this.tags,
        isNeed: this.isNeed
      }
      if (l) doc._id = l._id;
      Meteor.call(method, doc, (error) => {
        if (error) {
          alert(error.error)
        } else {
          this.title = ''
          this.category = ''
          this.description = ''
          this.tags = ''
          this.isNeed = false
        }
        Session.set('listing', null)
//        const modal = document.getElementById('listingModal');
//        modal.modal('hide')
      })
    },
    getTitle() {
      const l = Session.get('listing')
      if (!l) return "Create your listing!"
      return l.title
    }
  },
}
</script>

<style>
</style>
    