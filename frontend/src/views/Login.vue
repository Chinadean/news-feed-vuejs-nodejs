<template>
  <div id="container">
    <div id="login">
      <div id="description">
        <h1>Login</h1>
        <p>By logging in you agree to the ridiculously long terms that you didn't bother to read.</p>
      </div>
      <div id="form">
        <form @submit.prevent="login">
          <label for="email">Email</label>
          <input v-model="email" required type="text" id="email" name="email" />
          <label for="password">Password</label>&nbsp;
          <input v-model="passowrd" type="password" required id="password" name="password" />
          <input type="submit" @click="login()" value="Login" />
        </form>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      passowrd: ""
    };
  },
  methods: {
    login: function() {
      let email = this.email;
      let password = this.passowrd;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
#container {
  max-width: 80%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
}

#login {
  display: flex;
  justify-content: center;
  margin-top: 20%;
  width: 100%;
  height: 40.5vh;
}

#description {
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
  width: 25%;
  height: 30vh;
  padding: 3%;
}

#description h1,
#description p {
  margin: 0;
}

#description p {
  font-size: 0.8em;
  color: #95a5a6;
  margin-top: 10px;
}

#form {
  background-color: #34495e;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #ecf0f1;
  width: 25%;
  padding: 35px;
}

#form label,
#form input {
  outline: none;
  width: 100%;
}

#form label {
  color: #95a5a6;
  font-size: 0.8em;
}

#form input {
  background-color: transparent;
  border: 0px;
  border-bottom: 1px solid #a8a8a8;
  color: #ecf0f1;
  font-size: 1em;
  margin-bottom: 20px;
}

#form ::placeholder {
  color: #ecf0f1;
  opacity: 1;
}

#form button {
  background-color: #ffffff;
  cursor: pointer;
  border: none;
  width: 10vw;
  height: 5vh;
  margin-top: 5%;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

#form button:hover {
  background-color: #eeeeee;
}

@media screen and (max-width: 600px) {
  div#app div#login {
    align-items: unset;
    background-color: unset;
    display: unset;
    justify-content: unset;
  }

  #description {
    margin: 0 auto;
    max-width: 350px;
    width: 100%;
  }

  #form {
    border-radius: unset;
    box-shadow: unset;
    width: 100%;
  }

  #form form {
    margin: 0 auto;
    max-width: 280px;
    width: 100%;
  }
}
</style>