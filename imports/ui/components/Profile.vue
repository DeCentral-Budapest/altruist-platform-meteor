<template>
  <div class="container">
  <div class="fixed-bottom bd-highlight">
    <div class="container-fluid">
      This is your private view. <a class="" href="#">See what others see</a>
    </div>
  </div>

    <div class="card mb-4">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-3 text-center">
              <img class="avatar rounded-circle img-thumbnail" alt="avatar" v-bind:src="avatarimg">
          </div>
          <div class="col-sm-9">
            <h2>{{currentUser.username}}</h2>
            <div class="d-flex justify-content-center">
              <button class="btn btn-primary btn-block m-2">Connections</button>
              <button class="btn btn-primary btn-block m-2" @click="editProfile">Edit profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-body">
      <h3>Relations</h3>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        <div v-for="relation in relations" class="col">
          <div class="card h-100">
            <img class="card-img-top rounded-circle" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEXv8PL6+/1/ipDz9Pbv7/Dt8PFueYB5g4n2+fzn6eyAiJB8ho16h4+Ai5Ht7vD19felq69zf4bBxsjS19l1gYTm6+yFjpSZnqKYoaR3hId3gYrh4eWytruOlZmUmqBwfILFy8yqsLTvp419AAAEDklEQVR4nO3b63aiMBSG4ZAQwzkqHqptR3v/NzkJtGptcIo6unfW986PWWuolsfEAA6KJPbEs3fgvwch/yDkH4T8g5B/EPIPQv5ByD8I+Qch/yDkH4T8g5B/F4TWKi5Ze5VQCT4pCCEkH4QQ0g9CCOkHIYT0gxBC+kEIIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDS75FCrW/a1SsfjjG8mzDVrvSWuicQoiEpdD+fJNntuZ0SaiTxUWOo15N7tB7/XnyIUDf2xZjNZmNuyT98+zJ2CB8kVLksX0Uq9I29VjIf+0Z80CzNZaX0jUcLv7deOPJZHicc+5BgTpiOfAgzYVnkYx8CIYS/DMKT+hVXh48JMQi1sCLPhQ0vmVEIs7d6Z97bLLg1BmH2ZyaLSu7mNrQ1AqGaz4qikLWc5KFfEoFQ/KkK6du+hQYxBuGqqjth9RHrGL5XshfGOob2bSu7aTppYx3DxjhhXZt1Etoag9DmcmG2k2kWvNKNQahV0s73eRLvOY03Wjt0IR+H8FLMhGr8h5KMhKoRqp2GT68vxEjYCNua2TR4SLgQH6EWWWuk9MShz87S0GrDSJh4oKxn0ywNE7t/VfZsKx+hbRelu0SS9WI6cDXvP85Qr/OMqdAB+/NrWZvB5UarvD6/EOYitO1GylNiYBjdCOarH9f6LIRa2+49eMgtN+n5oqLdTy1X/kJqts/E8RVgIUyPU/SzxTRwFprqsnQj7BajeXJcVTkIm8wBi2/C6vy4qN17sFlUlRdKN1GPWzkIk3ZRnAk98fuCkqrl10T+HEUuQv1zivYMf1zs56L/K7V5XZ1sNp6YshCmZ4vMQSjN9Hhw96uoqU+3H1ZU2kLVHyaKENGN0+dxsRvBrw/cDq/Abm/pC1XTAesw0BOTXqiWdfnjp3b7hLqwdCeZrRkawf696BFuFTXnI+j/9CsqVaHuhLadDfI6x8JfaailO2MNvgBzd9SkKuzG0K2iVWjXv42issuiGpjIWzeKlIV18DBxlvnIV8ER9FWLeeaEJO/F8LP0V9WlHB7noprNa6pjmP5S+A+/LGVB9I6h+wi709TIhdILR8ZQSHMMl/cCFsH//H6+UNxROPZXc5ulRNdSd1m4Dl41jc6sLc17hFPV3Ok+bzHwAfKThf29+smNt+v3O9XQXGn8zLrL9y0E1e9bPLPHCfUdvvd0zRNgDCGkH4QQ0g9CCOkHIYT0gxBC+kEIIf0ghJB+EEJIPwghpB+EENIPQgjpByGE9IMQQvpBCCH9IISQfhBCSD8IIaQfhBDSD8Jw1iouWXuVMJIg5B+E/IOQfxDyD0L+Qcg/CPkHIf8g5B+E/IOQfxDyL37hX1Wmjti02vgMAAAAAElFTkSuQmCC" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">{{relation.name}}</h5>name
              <h6 class="card-subtitle mb-2 text-muted">zone number: {{relation.zonenumber}}</h6>
              <h6 class="card-subtitle mb-2 text-muted">tx counter: </h6>
              <p class="card-text">{{relation.description}}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">{{relation.createdAt.toLocaleDateString()}}</small>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>


     <div class="card mb-4">
      <div class="card-body">
        <h4>Altruist score</h4>
          <div class="d-flex justify-content-center">
            <i class="fa-regular fa-thumbs-up"></i>
            <p> 42</p>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Photos } from '../../api/collections/Photos';

export default {
  name: "Profile",
  data() {
    return {
    }
  },
  components: {
  },
  meteor: {
    currentUser () {
      return Meteor.user();
    },
    avatarimg() {
      return Meteor.user()?.avatar;
    },
    $subscribe: {
      'users': [],
    },
    relations () {
    },
  },
  methods: {
    editProfile () {
      Photos.upload(
        { category: 'userAvatar' },
        function oncomplete(file) {
          Meteor.call('updateAvatar', file.path, (error) => {
            if (error) {
              alert(error.error)
            } else {
            console.log("update success");
            }
          })
      });

    }
  }
}
</script>
