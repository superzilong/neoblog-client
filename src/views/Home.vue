<template>
  <div class="home">
    <div>
      <img src="../assets/background.jpg" alt="" />
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <el-card v-for="i in 4" :key="i" class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <a
            href="https://superzilong.github.io/superzilong.github.io/2016/07/09/html/"
          >
            {{ "post:" + i }}
          </a>
        </span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >操作按钮</el-button
        >
      </div>
      <div v-for="o in 2" :key="o" class="text item">
        {{ "列表内容 " + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 900px;
  margin: 10px auto;
}
</style>
