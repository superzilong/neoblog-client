<template>
  <div id="app">
    <header class="clearfix">
      <h1 id="logo">
        <router-link to="/" titile="Your Nerd Brother">
          <img src="./assets/logo.png" alt="Your Nerd Brother" />
        </router-link>
      </h1>
      <ul id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/manage" v-if="showControlPanel">Manage</router-link>
        <div class="nav-item" v-if="currentUser">
          <li>
            <router-link to="/profile">{{ currentUser.username }}</router-link>
          </li>
          <li>
            <a href @click="logOut">Logout</a>
          </li>
        </div>
        <div class="nav-item" v-if="!currentUser">
          <li>
            <router-link to="/login">Signin</router-link>
          </li>
          <li>
            <router-link to="/register">SignUp</router-link>
          </li>
        </div>
      </ul>
    </header>
    <router-view />
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

    const showControlPanel = computed(() => {
      if (
        currentUser !== null &&
        currentUser.value !== null &&
        currentUser.value.roles !== null
      ) {
        return currentUser.value.roles.includes("ROLE_MODERATOR");
      }
      return false;
    });

    const logOut = () => {
      context.root.$store.dispatch("auth/logout");
      context.root.$router.push("/login");
    };

    onMounted(() => {});

    return { currentUser, showControlPanel, logOut };
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
  float: left;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 30px;
  img {
    display: block;
  }
}

#nav {
  list-style-type: none;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  float: right;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 30px;

  a {
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-family: monospace;
    font-size: 18px;

    &.router-link-exact-active {
      color: yellow;
      font-weight: bold;
    }
  }
}

.nav-item {
  display: inline-block;
}
</style>
