<template>
  <div class="demo-type">
    <h1>欢迎：{{ user.username }}</h1>
    <div class="show-admin-box">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <div class="show-admin">
        <p>用户：</p>
        <p>{{ user.username }}</p>
      </div>
      <div class="show-admin">
        <p>地址：</p>
        <p>{{ user.address }}</p>
      </div>
      <div class="show-admin">
        <p>手机：</p>
        <p>{{ user.phone }}</p>
      </div>
      <div class="show-admin">
        <p>姓名：</p>
        <p>{{ user.realName }}</p>
      </div>
      <!-- <div class="show-admin">
        <p>密码：</p>
        <p>******</p>
      </div>
      <el-row>
        <el-button
          class="btn-edit"
          @click="test()"
          type="success"
          icon="el-icon-edit"
          circle
        ></el-button>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.demo-type {
  height: 93vh;
  background: #1380d2;
  background-image: url(../assets/bg-register.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}
.show-admin-box {
  width: 400px;
  position: absolute;
  right: 26%;
  top: 23%;
}
h1 {
  color: white;
  margin: 0;
  padding-top: 110px;
}
.show-admin {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid;
  color: white;
}

.show-admin p:nth-child(1) {
  width: 100px;
}

.show-admin p:nth-child(2) {
  min-width: 200px;
}
.btn-edit {
  margin-top: 20px;
}
</style>

<script>
export default {
  data() {
    return {
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
    test() {
      console.log("test"); // 跳转链接的操作
      this.$router.replace("/adminUpdate");
    },
  },
  mounted() {
    this.user = this.$store.state.userInfo;
  },
};
</script>




