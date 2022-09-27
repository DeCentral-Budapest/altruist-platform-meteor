<template>
  <form class="login-form justify-content-center" @submit.prevent="handleSubmit">
    <div class="form-floating mb-4">
      <input
          id="username"
          name="username"
          type="text"
          placeholder="Username or email"
          required
          v-model="username"
          class="form-control"
      />
      <label for="username" class="form-label">Username or email</label>       
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
      <button type="submit" class="btn btn-primary btn-block mb-4">Log In</button>
    </div>
  </form>
</template>

<script>
import { Meteor } from 'meteor/meteor';

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    handleSubmit(event) {
      Meteor.loginWithPassword(this.username, this.password, function (error) {
          if (error) alert(error.message);
        });
    }
  },
}
</script>
