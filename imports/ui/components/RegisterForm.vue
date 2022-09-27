<template>
  <form class="register-form" @submit.prevent="handleSubmit">
    <div class="form-floating mb-4">
      <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          v-model="username"
          class="form-control"
      />
      <label for="username" class="form-label">Username</label>
    </div>

    <div class="form-floating mb-4">
      <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          v-model="email"
          class="form-control"
      />
      <label for="email" class="form-label">Email</label>
    </div>

    <div class="form-floating mb-4">
      <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          v-model="password"
          class="form-control"
      />
      <label for="password" class="form-label">Password</label>
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
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    handleSubmit(event) {
      Accounts.createUser({ username: this.username, email: this.email, password: this.password }, function (error) {
          if (error) alert(error.message);
        });
    }
  },
}
</script>
