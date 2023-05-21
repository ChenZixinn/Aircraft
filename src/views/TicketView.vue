<template>
  <div class="ticket">
    <div class="ticket-header">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="出发地">
          <el-input v-model="form.fromCity"></el-input>
        </el-form-item>
        <el-form-item label="目的地">
          <el-input v-model="form.targetCity"></el-input>
        </el-form-item>
        <el-form-item label="出发时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <!-- <el-col class="line" :span="2">-</el-col> -->
          <!-- <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询航班</el-button>
          <el-button @click="clear()">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <h1>This is an Ticket page</h1>

    <div class="ticket-box"></div>
    <div class="ticket-header"></div>
    <div>
      <el-table :data="data" stripe style="width: 90%">
        <el-table-column prop="id" label="航班id" width="100">
        </el-table-column>
        <el-table-column prop="number" label="航班号" width="100">
        </el-table-column>
        <el-table-column prop="fromCity" label="出发地"> </el-table-column>
        <el-table-column prop="targetCity" label="目的地" width="180">
        </el-table-column>
        <el-table-column prop="arrivalTime" label="到达时间" width="180">
        </el-table-column>
        <el-table-column prop="departureTime" label="登机时间" width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column label="预定">
          <template slot-scope="scope">
            <el-button
              @click="buyTicket(scope.$index, scope.row)"
              icon="el-icon-plus"
              circle
            ></el-button>
            <!-- <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="pages"
      :current-page.sync="nowPage"
      @current-change="pageChange()"
    >
    </el-pagination>

    <!-- 对话框  -->
    <!-- <el-button type="text" @click="dialogFormVisible = true"
      >打开嵌套表单的 Dialog</el-button
    > -->

    <el-dialog title="预定机票" :visible.sync="dialogFormVisible">
      <el-form :model="dialogData">
        <div class="card">
          <div class="card-body">
            <div class="card-left">
              <div>{{ dialogData.fromCity }}</div>
              <!-- <div>{{dialogData.departureTime}}</div> -->
            </div>
            <div class="card-center">
              <div>航班号：{{ dialogData.number }}</div>
              <el-divider></el-divider>
              <div>状态：{{ dialogData.status }}</div>
            </div>
            <div class="card-right">
              <div>{{ dialogData.targetCity }}</div>
              <!-- <div>{{dialogData.arrivalTime}}</div> -->
            </div>
          </div>
        </div>
        <el-form-item label="座位类型">
          <el-radio-group v-model="dialogData.type">
            <el-radio label="商务座"></el-radio>
            <el-radio label="一等座"></el-radio>
            <el-radio label="二等座"></el-radio>
          </el-radio-group>
          <!-- <el-select v-model="dialogData.type" placeholder="请选择活动区域">
            <el-option label="商务座" value="business"></el-option>
            <el-option label="一等座" value="first"></el-option>
            <el-option label="二等座" value="second"></el-option>
          </el-select> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmBuyTicket()">预 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
h3 {
  margin: 40px 0 0;
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
  padding: 30px 0;
  margin: 10px auto;
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

<script>
import {
  api_getALlTicket,
  api_getTicket,
  api_selectTicket,
  api_OrderAdd,
} from "../api/admin.js";
export default {
  data() {
    return {
      data: [],
      form: {
        fromCity: "",
        targetCity: "",
        date1: "",
        //date2: '',
      },
      dialogData: {
        arrivalTime: "", //时间
        departureTime: "",
        businessClass: "", //座位
        firstClass: "",
        secondClass: "",
        fromCity: "", // 城市
        targetCity: "",
        id: "",
        number: "",
        price: "",
        status: "",
      },
      pages: 0, //总页数
      nowPage: 0,
      dialogFormVisible: false,
    };
  },
  methods: {
    async onSubmit() {
      console.log("submit!");
      console.log(this.form.fromCity);
      console.log(this.form.targetCity);
      console.log(this.form.date1);
      if (!this.form.fromCity) {
        this.form.fromCity = null;
      }
      if (!this.form.targetCity) {
        this.form.targetCity = null;
      }
      const { data: res } = await api_selectTicket(
        this.form.fromCity,
        this.form.targetCity,
        this.form.date1
      );
      this.data = res.records;
      console.log(this.data);
      this.pages = Number(res.pages);
      console.log(this.pages);
    },
    async getData() {
      // 1
      console.log("getdata");
      const res = await api_getALlTicket();
      console.log(res);
      if (res.status == 10000) {
        this.data = res.data.records;
        // console.log(this.data);

        // 2
        // console.log(res.pages);
        this.pages = Number(res.data.pages);
        // console.log(this.pages);
      } else {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
    },
    clear() {
      this.form.fromCity = "";
      this.form.targetCity = "";
      this.form.date1 = "";
      this.form.date2 = "";

      this.$refs["form"].resetFields(); //todo 这个方法失效
      this.$message({
        message: "您进行了重置",
        type: "warning",
      });
    },
    async pageChange() {
      const { data: res } = await api_getTicket(this.nowPage);
      this.data = res.records;
    },
    buyTicket(index, row) {
      console.log("buyTicket::::", row);
      console.log("test::::", this.data[index].id);
      this.dialogData = this.data[index];
      console.log(this.dialogData);
      this.dialogFormVisible = true;
    },
    async confirmBuyTicket() {
      this.dialogFormVisible = false;
      console.log(this.dialogData.id);
      const res = await api_OrderAdd(this.dialogData);
      console.log("结果：");
      console.log(res);
      if (res.status == 10000) {
        this.$message({
          message: "预订成功",
          type: "success",
        });
      } else {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

