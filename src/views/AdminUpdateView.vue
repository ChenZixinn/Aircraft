<template>
  <div class="update-view-box">
    <div class="update-view">
      <el-form ref="form" :model="form" label-width="80px">
        <h3>用户：{{ form.username }}</h3>
        <!-- <el-form-item label="用户"> 
            
            <p>{{form.username}}</p> 
            <el-input v-model="form.username"></el-input>
        </el-form-item> -->
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
        <el-form-item label="确认密码" class="font-white">
          <el-input v-model="form.passwordcheck"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="onSubmit">提交修改</el-button>
          <el-button @click="toAdmin">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.update-view-box {
  height: 93vh;
  background: #1380d2;
  background-image: url(../assets/bg-register.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}
.update-view {
  width: 400px;
  position: absolute;
  right: 26%;
  top: 23%;
}
h3 {
  color: white;
}
</style>
<style>
.font-white .el-form-item__label {
  color: white;
}
</style>

<script>
import { api_admin_update } from "../api/admin.js";

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
        passwordcheck: "",
      },
      dialogFormVisible: false,
    };
  },
  methods: {
    async onSubmit() {
      if (this.form.password != this.form.passwordcheck) {
        this.$message({
          message: "密码不一致",
          type: "error",
        });
      } else {
        console.log("submit!");
        const res = await api_admin_update(this.form);
        console.log(res);
        if (res.status == 10000) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      }
    },
    toAdmin() {
      this.$router.replace("/admin");
    },
  },
  mounted() {
    this.form = this.$store.state.userInfo;
    this.form.password = "";
  },
};
</script>
