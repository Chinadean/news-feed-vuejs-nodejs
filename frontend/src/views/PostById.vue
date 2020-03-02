<template>
  <div class="container">
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div
        class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
      >
        <img :src="'http://localhost:9000/' + post.postImage" class="postImage" />
        <p class="title">{{ post.name }}</p>
        <p class="content">{{ post.content }}</p>
        <p class="category">{{ post.category.name }}</p>
      </div>
    </div>
    <div class="ad-container">
      <img src="../assets/firstadd.gif" alt="ad" class="first-add" />
      <div class="weather-container">
        <h1 class="city">Prishtinë</h1>
        <h1 class="current-temperature">{{currentTemperature}}° C</h1>
        <img src="../assets/cold.png" alt="weather-icon" class="weather-icon" />
        <h1 class="max-temperature">Max:{{maxTemp}}° C</h1>
        <h1 class="min-temperature">Min:{{minTemp}}° C</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "lajme",
  data() {
    return {
      posts: [],
      error: "",
      text: "",
      currentTemperature: "",
      maxTemp: "",
      minTemp: "",
      icon: ""
    };
  },
  methods: {
    getWeather() {
      const url = `http://api.openweathermap.org/data/2.5/forecast?id=786714&units=metric&APPID=cc9c7da53e7f9463cb476064966e5265`;
      axios
        .get(url)
        .then(response => {
          (this.currentTemperature = response.data.list[0].main.temp),
            (this.maxTemp = response.data.list[0].main.temp_max),
            (this.minTemp = response.data.list[0].main.temp_min);
        })
        .catch(err => {
          return err;
        });
    }
  },
  async created() {
    axios
      .get(`http://localhost:9000/posts/` + this.$route.params.id)
      .then(response => {
        this.posts = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  beforeMount() {
    this.getWeather();
  }
};
</script>

<style scoped>
.container {
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  height: 155vh;
}

.posts-container {
  width: 70%;
  margin-top: 7.5%;
}

.ad-container {
  width: 30%;
  margin-top: 7.5%;
}

.weather-container {
  position: relative;
  background-color: #f8f8f8;
  margin-top: 10%;
  border: 1px solid #e4e4e4;
  height: 35vh;
  width: 92.5%;
  text-align: center;
}

.city {
  font-size: 2rem;
  margin-top: 2.5%;
}

.weather-icon {
  margin-top: 5%;
  height: 10vh;
}

.current-temperature {
  position: absolute;
  left: 41%;
  top: 60%;
  font-size: 1.2rem;
}

.max-temperature {
  position: absolute;
  font-size: 0.8rem;
  bottom: 5%;
  left: 17.5%;
}

.min-temperature {
  position: absolute;
  font-size: 0.8rem;
  bottom: 5%;
  left: 65%;
}

.first-add {
  margin-top: 15%;
  height: 40vh;
  cursor: pointer;
}

.error {
  border: 1px solid red;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

.post {
  position: relative;
  display: inline-flex;
  margin: 6% 0 0 0;
  border: 1px solid #e6e6e6;
  background-color: #ffffff;
  width: 50vw;
  height: 100vh;
  color: #2c3e50;
  -webkit-box-shadow: 7px 4px 23px 0px rgb(236, 236, 236);
  -moz-box-shadow: 7px 4px 23px 0px rgb(236, 236, 236);
  box-shadow: 7px 4px 23px 0px rgb(236, 236, 236);
}

.postImage {
  width: 50vw;
  height: 60vh;
}

.title {
  font-size: 1.4rem;
  position: absolute;
  bottom: 30%;
  left: 5%;
}

.content {
  position: absolute;
  font-size: 0.9rem;
  color: #313131;
  font-weight: 500;
  bottom: 7.5%;
  left: 5%;
  width: 45vw;
  height: 20vh;
}

.category {
  position: absolute;
  font-size: 0.7rem;
  color: #a0a0a0;
  font-weight: 500;
  right: 5%;
  bottom: 2.5%;
}
</style>
