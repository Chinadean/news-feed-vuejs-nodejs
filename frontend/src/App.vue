<template>
  <div id="app">
    <div id="nav">
      <img src="./assets/navlogo3.png" class="navLogo" />
      <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
      <router-link v-if="isLoggedIn" to="/dashboard">Dashboard</router-link>
      <router-link to="/login"></router-link>
      <span v-if="isLoggedIn">
        |
        <a @click="logout">Logout</a>
      </span>
      <router-link to="/fun">Fun</router-link>
      <router-link to="/auto">Auto</router-link>
      <router-link to="/teknologji">Teknologji</router-link>
      <router-link to="/shendetesi">Shëndetësi</router-link>
      <router-link to="/kultura">Kultura</router-link>
      <router-link to="/sport">Sport</router-link>
      <router-link to="/ekonomi">Ekonomi</router-link>
      <router-link to="/">Lajme</router-link>
    </div>
    <router-view />
  </div>
</template>


<script>
export default {
  name: "App",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout);
        }
        throw err;
      });
    });
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap");

* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Source Sans Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f9f9f9;
}

#nav {
  background: #2f476d;
  width: 100%;
  height: 8vh;
  position: fixed;
  z-index: 1000;
}

.navLogo {
  height: 6vh;
  margin-top: 0.4%;
  margin-left: 0.5%;
  cursor: pointer;
}

#nav a {
  font-weight: bold;
  float: right;
  color: #2c3e50;
  padding: 0px 1%;
  text-decoration: none;
  margin-top: 1.25%;
  color: white;
}

#nav a.router-link-exact-active {
  color: #c4c4c4;
}
</style>
