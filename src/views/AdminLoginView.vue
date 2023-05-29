<template>
  <div class="login-view-box">
    <div class="login-view">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="onSubmit">登录</el-button>
          <el-button @click="toRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
body {
  
}
.login-view-box{
   height: 95vh;
   background: #1380d2;
   background-image: url(../assets/bg-login.jpg);
   background-repeat: no-repeat;
   background-position: center;
   position: relative;
}
.login-view {
  width: 400px;
  position: absolute;
  right: 20%;
  top: 56%;
}
@media screen and (min-width: 1500px) {
  .login-view {
    right: 25%;
  }
}

</style>

<script>
import { api_login } from "../api/admin.js";

export default {
  data() {
    return {
      form: {
        username: "tzuxin",
        password: "123456",
      },
      user: {
        address: "",
        password: "",
        id: "",
        phone: "",
        realName: "",
        username: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      console.log("submit!", this.form);

      //console.log(this.$store.state.userInfo);
      // this.$store.commit('updateUserInfo', this.user);

      // console.log(this.$store.state.userInfo);
      // let userInfo = this.$store.state.userInfo;
      // console.log(userInfo.id);

      const res = await api_login(this.form);
      console.log(res);

      if (res.msg == "SUCCESS") {
        this.$parent.isLogin = true;
        this.$store.state.isLogin = true;
        this.$store.commit("changeLoginState", true);
        console.log("记录数据跳转到个人中心");
        this.$store.commit("updateUserInfo", res.data);
        console.log(this.$store.state.userInfo);
        // this.$router.go(0);

        //  跳转

        this.$router.replace("/admin");
      } else {
        //提示框
        this.$message({
          message: "用户或密码错误，请重新输入",
          type: "error",
        });
      }
    },
    toRegister() {
      this.$router.replace("/regiter");
    },
  },
};
</script>
