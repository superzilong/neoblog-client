<template>
  <div class="home">
    <div>
      <img src="../assets/background.jpg" alt="" />
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <ul id="articles">
      <li v-for="(article, index) in articles" :key="index">
        <div class="item">
          <router-link :to="'/articles/' + article[0]">{{
            article[1]
          }}</router-link>
          <p>Posted on {{ article[2] }}</p>
          <hr />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import articleSrc from "@/service/article.service";
export default {
  name: "home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      articles: []
    };
  },
  mounted() {
    this.articles = [];
    articleSrc.getArticleList().then(
      response => {
        this.articles = response.data;
        console.log(response.data);
      },
      error => {
        console.log(error);
      }
    );
    // axios
    //   .get("base/articles", {
    //     headers: { "Content-Type": "application/json;charset=UTF-8" }
    //   })
    //   .then(response => {
    //     this.$set(this, "articles", response.data);
    //     console.log(this.articles);
    //   });
  }
};
</script>

<style lang="scss">
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

#articles {
  list-style-type: none;
  padding: 0;
  overflow: hidden;
  margin: 0; // margin-top: 40px;
  a {
    display: block;
    color: black;
    text-align: left;
    margin: 50px 20px 0px;
    padding: 10px 0;
    text-decoration: none;
    // font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 30px;
    font-weight: 800;
    line-height: 1.1;
    &:hover {
      color: #01b5b6;
    }
    // &.router-link-exact-active {
    //   color: yellow;
    //   font-weight: bold;
    // }
  }

  p {
    margin: 0px 20px 30px;
    font-family: "Lora", "Times New Roman", serif;
    font-size: 18px;
  }

  hr {
    margin: 0px 40px 0px 20px;
    border: 0px;
    border-top: 1px solid #ccc;
    display: block;
    // unicode-bidi: isolate;
    // margin-block-start: 0.5em;
    // margin-block-end: 0.5em;
    // margin-inline-start: auto;
    // margin-inline-end: auto;
    // overflow: hidden;
  }
}
</style>
