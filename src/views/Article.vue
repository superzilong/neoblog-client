<template>
  <div :key="id">
    <!-- <h1>{{ title }}</h1>
    <p>{{ mdContent }}</p> -->
    <div v-html="htmlContent"></div>
    <!-- <p>{{ summary }}</p> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Article",
  data() {
    return {
      id: this.$route.params.id,
      title: "",
      mdContent: "",
      htmlContent: "",
      summary: ""
    };
  },
  mounted() {
    let _this = this;
    axios({
      method: "get",
      url: "/api/articles/" + _this.id,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    })
      .then(response => {
        this.title = response.data["title"];
        this.mdContent = response.data["mdContent"];
        this.htmlContent = response.data["htmlContent"];
        this.summary = response.data["summary"];
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
