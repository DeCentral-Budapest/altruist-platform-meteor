<template>
  <form class="register-form" @submit.prevent="handleSubmit">
    <div class="form-floating mb-4">
      <input
          id="username_book"
          name="username"
          type="text"
          placeholder="Name"
          v-model="username"
          class="form-control"
      />
      <label for="username_book" class="form-label">Name</label>
    </div>
    <div class="form-floating mb-4">
      <input
          id="email_book"
          name="email"
          type="email"
          placeholder="Email"
          required
          v-model="email"
          class="form-control"
      />
      <label for="email_book" class="form-label">Email</label>
    </div>
    <div class="form-floating mb-4">
      <input
          id="reason"
          name="reason"
          type="text"
          placeholder="Why do you want to join us?"
          required
          v-model="reason"
          class="form-control"
      />
      <label for="reason" class="form-label">Why do you want to join us?</label>
    </div>
    <div>
      <button type="submit" class="btn btn-primary btn-block mb-4">Book in!</button>
    </div>
  </form>
</template>


<script>
import { Accounts } from 'meteor/accounts-base';

export default {
name: "BookingForm",
data() {
  return {
      registerActive: false,
      username: "",
      email: "",
      reason: "",
    };
  },
  meteor: {
    currentUser () {
        return Meteor.user();
    },
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault()
        const method = 'createListing'
        const doc = {
          title: '<i>' + this.username + ' </i> sent a membership request. ',
          description: '<i>' + this.username + '</i>?<br /> wants to join with the following reason: <blockquote class="blockquote">' + this.reason + '</blockquote><br />If you know why we should trust this person/community/organisation, please let Us know below this <i>Listing</i>.',
          tags: '#NewBooking #MembershipRequest #ApprovalNeeded #WaitList',
          isNeed: true,
          offer: 'services',
        }
        Meteor.call(method, doc, (error) => {
          if (error) {
            alert(error.error)
          } else {
            alert('Booking sent to approval')
          }
            Session.set('listing', null)
          })
        },
        // TODO mailto:altru@valto.ro
    }
  };
</script>
