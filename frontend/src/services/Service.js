import axios from "axios";

const url = "http://localhost:9000/posts/";
const urlEkonomi = "http://localhost:9000/ekonomi/";
const urlTeknologji = "http://localhost:9000/teknologji/";
const urlSport = "http://localhost:9000/sport/";
const urlKultura = "http://localhost:9000/kultura/";
const urlShendetesi = "http://localhost:9000/shendetesi/";
const urlFun = "http://localhost:9000/fun/";
const urlAuto = "http://localhost:9000/auto/";

class Service {
  static getAllPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.posts.map(post => ({
            ...post
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  static getEconomyPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(urlEkonomi);
        const data = res.data;
        resolve(
          data.posts.map(post => ({
            ...post
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  static getTeknologjiPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(urlTeknologji);
        const data = res.data;
        resolve(
          data.posts.map(post => ({
            ...post
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  static getSportPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(urlSport);
        const data = res.data;
        resolve(
          data.posts.map(post => ({
            ...post
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  static getKulturaPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(urlKultura);
        const data = res.data;
        resolve(
          data.posts.map(post => ({
            ...post
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  static getShendetesiPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(urlShendetesi);
        const data = res.data;
        resolve(
          data.posts.map(post => ({
            ...post
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  static getFunPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(urlFun);
        const data = res.data;
        resolve(
          data.posts.map(post => ({
            ...post
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  static getAutoPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(urlAuto);
        const data = res.data;
        resolve(
          data.posts.map(post => ({
            ...post
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  static insertPort(text) {
    return axios.post(url, {
      text: text
    });
  }

  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default Service;
