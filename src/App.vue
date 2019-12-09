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
        <router-link to="/about">About</router-link>
        <router-link to="/login">Login</router-link>
      </ul>
    </header>
    <router-view />
  </div>
</template>

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
</style>
