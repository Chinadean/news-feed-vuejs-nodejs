<template>
  <div class="container">
    <div class="innerContainer">
      <h1>Add new post</h1>
      <div class="form-group">
        <label for="name">Post name</label>
        <input type="text" placeholder="Post name" v-model="Post.name" />
      </div>
      <div class="form-group">
        <label for="name">Post content</label>
        <input type="text" placeholder="Post content" v-model="Post.content" />
      </div>
      <div class="form-group">
        <label for="name">Post category</label>
        <select v-model="selected">
          <option disabled value>Select one</option>
          <option
            v-for="category in categories"
            v-bind:value="category"
            v-bind:key="category"
          >{{category.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <input type="file" @change="onFileSelected" class="imageSelector" />
      </div>
      <div class="form-group">
        <button @click="createNewPost">Create new post</button>
      </div>
    </div>
  </div>
</template>

<script>
import mongoose from "mongoose";
import axios from "axios";

export default {
  name: "lajme",
  data() {
    return {
      categories: [],
      Post: {
        id: mongoose.Schema.Types.ObjectId(),
        name: "",
        content: "",
        category: "",
        postImage: "",
        createdAt: Date(Date.now())
      }
    };
  },
  created() {
    axios
      .get("http://localhost:9000/category")
      .then(response => response.data.categories)
      .then(data => this.categories)
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    onFileSelected() {},
    createNewPost() {
      let newPost = {
        name: this.name,
        content: this.content,
        category: this.category,
        postImage: (this.postImage = event.target.files[0])
      };
      axios
        .post("http://localhost:9000/posts")
        .then(response => console.log(response))
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  height: 100vh;
}

.innerContainer {
  margin-top: 10%;
  width: 100%;
  height: 70vh;
  border: 1px solid #2f476d;
  border-radius: 2px;
}

.form-group {
  margin-left: 5%;
}

.imageSelector {
  margin-top: 5%;
}
</style>
