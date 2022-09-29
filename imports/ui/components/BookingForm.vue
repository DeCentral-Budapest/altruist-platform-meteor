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
      <label for="reason" class="form-label">Reason</label>
    </div>
    <div>
      <button type="submit" class="btn btn-primary btn-block mb-4">Register</button>
    </div>
  </form>
</template>

<script>
import { Accounts } from 'meteor/accounts-base';

export default {
name: "RegisterForm",
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
      Accounts.createUser({ username: this.username, email: this.email, reason: this.reason }, function (error) {
          if (error) alert(error.message);
        });
    }
  },
}
</script>
