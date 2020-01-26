<template>
  <div id="app">
    <header class="clearfix">
      <h1 id="logo" class="pull-left">
        <router-link to="/" title="Your Nerd Brother">
          <img src="./assets/logo.png" alt="Your Nerd Brother" />
        </router-link>
      </h1>
      <el-menu
        :default-active="$route.path"
        class="height-equal pull-right"
        mode="horizontal"
        background-color="#333"
        text-color="#fff"
        active-text-color="yellow"
        router
      >
        <el-menu-item id="home" index="/home">Home</el-menu-item>
        <el-submenu id="manage" index="2" v-if="showControlPanel">
          <template slot="title">Manage</template>
          <el-menu-item index="/manage">Article</el-menu-item>
          <el-menu-item index="2-2">Category</el-menu-item>
          <el-menu-item index="2-3">User</el-menu-item>
        </el-submenu>
        <el-submenu id="profile" index="3" v-if="currentUser">
          <template slot="title">{{ username }}</template>
          <el-menu-item index="/profile">Setting</el-menu-item>
          <el-menu-item index="-1" @click="logOut">Logout</el-menu-item>
        </el-submenu>
        <el-menu-item id="login" index="/login" v-if="!currentUser"
          >Signin</el-menu-item
        >
      </el-menu>
    </header>

    <div><router-view id="container" /></div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/composition-api";

export default {
  name: "app",
  setup(props, context) {
    const currentUser = computed(() => {
      return context.root.$store.state.auth.user;
    });

    const username = computed(() => {
      if (currentUser.value !== null) {
        return currentUser.value.username;
      } else {
        return "";
      }
    });

    const showControlPanel = computed(() => {
      if (
        currentUser !== null &&
        currentUser.value !== null &&
        currentUser.value.roles !== null
      ) {
        return (
          currentUser.value.roles.includes("ROLE_MODERATOR") ||
          currentUser.value.roles.includes("ROLE_ADMIN")
        );
      }
      return false;
    });

    const logOut = () => {
      context.root.$store.dispatch("auth/logout");
      context.root.$router.push({
        name: "login"
      });
    };

    onMounted(() => {});

    return { currentUser, username, showControlPanel, logOut };
  }
};
</script>

<style lang="scss">
#app {
  background-color: #f4f5f5;
  width: 1200px;
  margin: 0 auto;
}

header {
  background-color: #333;
}

// clear fix
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  display: inline-block;
}
* html .clearfix {
  height: 1%;
}
.clearfix {
  display: block;
}

#logo {
  margin-top: 24px;
  margin-bottom: 15px;
  margin-left: 30px;
  img {
    display: block;
  }
}

.pull-left {
  float: left;
}

.pull-right {
  float: right;
}

.height-equal {
  height: 100px;
}

#home {
  height: 100px;
  line-height: 100px;
}

#manage {
  div {
    height: 100px;
    line-height: 100px;
  }
}

#profile {
  div {
    height: 100px;
    line-height: 100px;
  }
}

#login {
  height: 100px;
  line-height: 100px;
}

#container {
  min-height: calc(100vh - 101px);
  margin: 0;
}

.el-menu-item,
.el-submenu,
.el-menu,
.el-submenu__title {
  font-size: 18px !important;
  // font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
  //   "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

[font-family] {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
