<template>
  <div class="card">
    <p class="card-title">登机牌</p>
    <h3>{{ msg.number }}</h3>
    <div class="card-body">
      <div class="card-left">
        <h4>{{ msg.fromCity }}</h4>
        <div>出发地</div>
        <!-- <div>{{ msg.departureTime }}</div> -->
      </div>
      <div class="card-center">
        <!-- <div>{{ msg.number }}</div> -->
        <div>{{ msg.departureTime }}</div>
        <el-divider></el-divider>
        <div>
          {{ msg.type }} <span>¥{{ msg.price }}</span>
        </div>
      </div>
      <div class="card-right">
        <h4>{{ msg.targetCity }}</h4>
        <div>目的地</div>
        <!-- <div>{{ msg.arrivalTime }}</div> -->
      </div>
    </div>
    <el-button
      class="btn-del"
      type="danger"
      icon="el-icon-delete"
      @click="dialogFormVisible = true"
      circle
    ></el-button>

    <el-dialog title="取消机票" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="msg">
        <div class="dialog-card">
          <div class="card-body">
            <div class="card-left">
              <div class="font-style">{{ msg.fromCity }}</div>
              <!-- <div>{{dialogData.departureTime}}</div> -->
            </div>
            <div class="card-center">
              <div class="font-style">航班号：{{ msg.number }}</div>
              <el-divider></el-divider>
              <div class="font-style">状态：{{ msg.status }}</div>
            </div>
            <div class="card-right">
              <div class="font-style">{{ msg.targetCity }}</div>
              <!-- <div>{{dialogData.arrivalTime}}</div> -->
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返回</el-button>
        <el-button type="danger" @click="confirmCancleOrder(msg.id)"
          >确定取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { api_cancel_order } from "../api/admin.js";
export default {
  name: "HelloWorld",
  props: {
    msg: Object,
  },
  data() {
    return {
      dialogFormVisible: false,
    };
  },
  methods: {
    async confirmCancleOrder(oid, index) {
      console.log("index:");
      console.log(index);
      const res = await api_cancel_order(oid);
      if (res.status == 10000) {
        this.dialogFormVisible = false;
        this.$message({
          message: "取消成功",
          type: "success",
        });
        this.$parent.$router.go(0);
        // for (const order in this.$parent.orders) {
        // console.log(order);
        // }
        console.log(this.$parent);
      } else {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 30px 20px 20px;
  text-align: left;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.card {
  width: 400px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding-bottom: 30px;
  margin: 10px;
  position: relative;
  overflow: hidden;
}
.card-body {
  display: flex;
  align-items: center;
}
.card-left,
.card-center,
.card-right {
  width: 100%;
}

.btn-del {
  position: absolute;
  top: 10px;
  right: 10px;
}
.card-title{
  margin: 0;
  background: #234296;
  color: white;
  text-align: left;
  padding: 10px;
}
.font-style{
  font-size: 16px;
}
</style>
