<template>
  <div class="container">
    <div class="errorContainer">
      <h1 class="error404">404</h1>
      <div class="line"></div>
      <h1 class="notFound">Not found</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap");

.container {
  width: 100%;
  height: 85vh;
  text-align: center;
}

.errorContainer {
  display: inline-flex;
  width: 13vw;
  height: 14vh;
  font-family: "Source Sans Pro", sans-serif;
  margin-top: 17.5%;
}

.error404 {
  font-size: 3rem;
  font-weight: 100;
  color: #2c3e50;
}

.line {
  height: 3.5rem;
  border-left: 2px solid #2c3e50;
  margin-left: 10%;
  margin-top: 2.5%;
}

.notFound {
  font-size: 1rem;
  margin-top: 12.5%;
  margin-left: 10%;
  font-weight: 700;
  color: #2c3e50;
}
</style>
