<template>
  <form class="register-form" @submit.prevent="handleSubmit">
    <div>
      <label for="username">Username</label>
      <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          v-model="username"
      />
    </div>

    <div>
      <label for="email">Email</label>
      <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          v-model="email"
      />
    </div>

    <div>
      <label for="password">Password</label>
      <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          v-model="password"
      />
    </div>

    <div>
      <button type="submit">Register</button>
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
