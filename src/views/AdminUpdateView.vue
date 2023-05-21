<template>
  <div class="update-view">
    <el-form ref="form" :model="form" label-width="80px">
      <h3>用户：{{ form.username }}</h3>
      <!-- <el-form-item label="用户"> 
            
            <p>{{form.username}}</p> 
            <el-input v-model="form.username"></el-input>
        </el-form-item> -->
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.realName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.passwordcheck"></el-input>
      </el-form-item>

      <!-- <el-form-item label="性别">
            <el-radio-group v-model="form.resource">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交修改</el-button>
        <el-button @click="toAdmin">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<style scoped>
.update-view {
  width: 500px;
  margin: 30px auto;
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
  },
};
</script>