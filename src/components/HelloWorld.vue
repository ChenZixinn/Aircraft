<template>
  <div class="card">
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

    <el-dialog title="取消机票" :visible.sync="dialogFormVisible">
      <el-form :model="msg">
        <div class="card" style="width: 870px">
          <div class="card-body">
            <div class="card-left">
              <div>{{ msg.fromCity }}</div>
              <!-- <div>{{dialogData.departureTime}}</div> -->
            </div>
            <div class="card-center">
              <div>航班号：{{ msg.number }}</div>
              <el-divider></el-divider>
              <div>状态：{{ msg.status }}</div>
            </div>
            <div class="card-right">
              <div>{{ msg.targetCity }}</div>
              <!-- <div>{{dialogData.arrivalTime}}</div> -->
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmCancleOrder(msg.id)"
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
  border: 1px solid #ccc;
  border-radius: 15px;
  padding-bottom: 30px;
  margin: 10px;
  position: relative;
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
</style>
