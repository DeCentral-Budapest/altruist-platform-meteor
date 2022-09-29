<template>
    <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="profileModalLabel">Your profile data</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form>
                <div class="mb-3">
                    <label for="nickname" class="form-label">Nickname</label>
                    <input type="text" class="form-control" id="nickname" v-model="nickname">
                </div>
                <div class="mb-3">
                    <label for="realname" class="form-label">Real name</label>
                    <input type="text" class="form-control" id="realname" v-model="realname">
                </div>
                <div class="mb-3">
                    <label for="birth" class="form-label">Birth</label>
                    <input type="date" class="form-control" id="birth" v-model="birth">
                </div>
                <div class="mb-3">
                    <label for="region" class="form-label">Region</label>
                    <input type="text" class="form-control" id="region" v-model="region">
                </div>                
                <div class="mb-3">
                    <label for="web" class="form-label">Web</label>
                    <input type="text" class="form-control" id="web" v-model="web">
                </div>
                <div class="mb-3">
                    <label for="rocketchat" class="form-label">RocketChat</label>
                    <input type="text" class="form-control" id="rocketchat" v-model="rocketchat">
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
  name: "ProfileModal",
  data() {
    return {
      nickname: "",
      realname: "",
      birth: "",
      region: "",
      web: "",
      rocketchat: "",
    }
  },
  mounted: function() {
    const self = this;
    const myModal = document.getElementById('profileModal');
    myModal.addEventListener('shown.bs.modal', function () {
      const p = Session.get('profile')
      if (!p) return;
      self.nickname = p.nickname;
      self.realname = p.realname;
      self.birth = p.birth;
      self.region = p.region;
      self.web = p.web;
      self.rocketchat = p.rocketchat;      
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
        nickname: this.nickname,
        realname: this.realname,
        birth: this.birth,
        region: this.region,
        web: this.web,
        rocketchat: this.rocketchat,
      }
      Meteor.call('updateUser', doc, (error) => {
        if (error) {
          alert(error.error)
        } 
      });
    }
  },
}
</script>

