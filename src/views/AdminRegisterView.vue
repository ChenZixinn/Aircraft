<template>
  <div class="register-view-box">
    <h1>加入我们，成为会员</h1>
    <div class="register-view">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户" class="font-white">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="地址" class="font-white">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="手机" class="font-white">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="姓名" class="font-white">
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="font-white">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onSubmit">确定</el-button>
          <el-button @click="toLogin">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.register-view-box{
  height: 93vh;
  background: url(../assets/bg-register.png) no-repeat;
  background-size:100% 100%;  
  position: relative;
}
.register-view {
  width: 400px;
  position: absolute;
  top: 30%;
  right: 25%;
}
h1{
  color: white;
  margin: 0;
  padding-top: 100px;
}
</style>
<style>
  .font-white .el-form-item__label{
    color: white  ;
  }
</style>

<script>
import { api_admin_add } from "../api/admin.js";
export default {
  data() {
    return {
      form: {
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
      console.log("submit!");
      const res = await api_admin_add(this.form);
      console.log(res);
      if (res.msg != "SUCCESS") {
        this.$message({
          message: res.msg,
          type: "warning",
        });
      } else {
        console.log("成功");
        this.$router.replace("/login");
      }
    },
    toLogin() {
      this.$router.replace("/login");
    },
  },
};
</script>
