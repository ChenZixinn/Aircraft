<template>
  <div class="demo-type">
    <div>
      <!-- test
      <img src="" alt="头像" width="100" height="100"> -->
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
    </div>
    <div class="show-admin-box">
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
      <div class="show-admin">
        <p>密码：</p>
        <p>{{ user.password }}</p>
      </div>
    </div>

    <el-row>
      <el-button
        @click="test()"
        type="primary"
        icon="el-icon-edit"
        circle
      ></el-button>
    </el-row>
  </div>
</template>

<style scoped>
.show-admin-box {
  width: 500px;
  margin: 30px auto;
}
.show-admin {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid;
}

.show-admin p:nth-child(1) {
  width: 100px;
}

.show-admin p:nth-child(2) {
  min-width: 200px;
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




