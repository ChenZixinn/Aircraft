<template>
  <div id="app">
    <nav>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>| -->
      <div class="nav-left">
        <router-link class="link" to="/ticket">机票</router-link>
        <router-link class="link" to="/order">订单管理</router-link>
        <!-- <router-link class="link" to="/more">航班详情</router-link> -->
      </div>

      <div class="nav-right">
        <router-link class="link" to="/login" v-show="!isLogin"
          >登录</router-link
        >
        <router-link class="link" to="/admin" v-show="isLogin"
          >用户信息页</router-link
        >
        <a class="link" href="#" @click="logout" v-show="isLogin">退出登陆</a>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { api_logout, api_userinfo } from "./api/admin.js";
export default {
  name: "app",
  data() {
    return {
      isLogin: false,
      userInfo: {},
    };
  },
  methods: {
    async init() {
      // const res = await api_getAllOrder();
      // console.log(res);
      console.log("app::::::");
      this.isLogin = this.$store.state.isLogin;
      console.log(this.isLogin);

      const res = await api_userinfo();
      console.log("登陆状态");
      console.log(res);
      if (res.status == 10000) {
        this.$store.state.userInfo = res.data;
        this.userInfo = res.data;
        this.isLogin = true;
      } else {
        this.isLogin = false;
        this.userInfo = null;
      }
    },

    logout() {
      this.$store.state.isLogin = false;
      const res = api_logout();
      console.log(res);
      this.isLogin = false;
      this.$router.replace("/login");
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 10px;
  margin-bottom: 30px;
  background: #42b983;
  display: flex;
  justify-content: space-around;
}
.nav-left .link,
.nav-right .link {
  display: inline-block;
  width: 80px;
  padding: 5px 10px;
}

nav a {
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: #06160f;
}
</style>
