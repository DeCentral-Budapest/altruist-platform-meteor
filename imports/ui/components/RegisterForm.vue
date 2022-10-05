<template>
  <form class="register-form" @submit.prevent="handleSubmit">
    <div v-if="!checked" class="form-floating mb-4">
      <input
          id="invitation"
          name="invitation"
          type="text"
          placeholder="Invite code"
          v-model.trim="invitation"
          class="form-control"
      />
      <label for="invitation" class="form-label">invitation code is: <code>#{{ invitation.replace(/ /g, "") }}</code></label>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" id="formSwitchCheckDefault" v-model="checked">
      <label class="form-check-label" for="formSwitchCheckDefault">Use the <i>invited email</i> instead</label>
    </div>
    <div class="form-floating mb-4">
      <input
          id="email_sup"
          name="email"
          type="email"
          placeholder="Email"
          required
          v-model="email"
          class="form-control"
      />
      <label for="email_sup" class="form-label">Email</label>
    </div>
    <div class="form-floating mb-4">
      <input
          id="username_sup"
          name="username"
          type="text"
          placeholder="Username"
          v-model="username"
          class="form-control"
      />
      <label for="username_sup" class="form-label">Username</label>
    </div>
    <div class="form-floating mb-4">
      <input
          id="password_sup"
          name="password"
          type="password"
          placeholder="Password"
          required
          v-model="password"
          class="form-control"
      />
      <label for="password_sup" class="form-label">Password</label>
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
    invitation: "1stJoinerBy@root",
    username: "",
    email: "",
    password: "",
    checked: "",
  };
},
methods: {
  handleSubmit(event) {
    Accounts.createUser({ username: this.username, email: this.email, password: this.password, invitation: this.invitation }, function (error) {
        if (error) alert(error.message);
      });
  }
},
}
</script>
<style scoped>
.container {
  margin-bottom: 1em;
}
</style>
