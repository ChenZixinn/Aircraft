<template>
  <div class="ticket">
    <div class="mask"></div>
    <!-- 搜索头 -->
    <div class="ticket-header">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="出发地" class="font-white">
          <el-input v-model="form.fromCity"></el-input>
        </el-form-item>
        <el-form-item label="目的地" class="font-white">
          <el-input v-model="form.targetCity"></el-input>
        </el-form-item>
        <el-form-item label="出发时间" class="font-white">
          <el-col :span="11">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期"
              v-model="form.date1"
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
          <el-button
              class="btn-edit"
              @click="addTicket()"
              type="success"
              icon="el-icon-plus"
              
            ></el-button>
        </el-form-item>
      </el-form>
    </div>
    <h3>请选择您的航班</h3>
    <!-- 数据表格 -->
    <div class="table-box">
      <el-table :data="data" stripe class="table-data">
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            
            <el-button
              class="btn-edit"
              @click="updateTicket(scope.$index, scope.row)"  
              type="success"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              type="danger"
              @click="delTicket(scope.$index, scope.row)"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页导航 -->
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
    <el-dialog
      :title="`航班id：${dialogData.id}`"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form :model="dialogData">
        <div class="card">
          <div class="card-body">
            <div class="card-row">
              <div>
                航班号：<span class="red-font">{{ dialogData.number }}</span>
              </div>
              <div>
                出发站：<span class="red-font">{{ dialogData.fromCity }}</span>
              </div>
            </div>
            <div class="card-row">
              <div>
                登机时间：<span class="red-font">{{
                  dialogData.departureTime
                }}</span>
              </div>
              <div>
                到达站：<span class="red-font">{{
                  dialogData.targetCity
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="ma">
          <img src="../assets/ma.webp" alt="ma" />
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="danger" @click="confirmDelTicket()"
          >确定删除</el-button
        >
      </div>
    </el-dialog>

    <!-- 添加修改，对话框  -->
        <el-dialog
      :title="`${updatedialogTitle}`"
      :visible.sync="updatedialogFormVisible"
      width="750px"
    >
    <el-form ref="form" :inline="true" :model="dialogData" label-width="80px" class="update-dialog">
      <div>
        <el-form-item label="航班号" class="">
          <el-input v-model="dialogData.number"></el-input>
        </el-form-item>
        <el-form-item label="价格" class="">
          <el-input v-model="dialogData.price"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="出发地" class="">
          <el-input v-model="dialogData.fromCity"></el-input>
        </el-form-item>
        <el-form-item label="目的地" class="">
          <el-input v-model="dialogData.targetCity"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="状态" class="">
          <el-input v-model="dialogData.status"></el-input>
        </el-form-item>
        <el-form-item label="登机时间" class="">
          <el-col :span="11">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              v-model="date1"
            ></el-date-picker>
          </el-col>
          <!-- <el-col class="line" :span="2">-</el-col> -->
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="time1" format = 'HH:mm' value-format="HH:mm"  style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="到达时间" class="">
          <el-col :span="11">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              v-model="date2"
            ></el-date-picker>
          </el-col>
          <!-- <el-col class="line" :span="2">-</el-col> -->
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="time2" format = 'HH:mm' value-format="HH:mm" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-switch v-model="dialogData.status"></el-switch>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatedialogFormVisible = false">取 消</el-button>
        <el-button v-if="isupdate" type="success" @click="confirmUpdateTicket()"  
          >修改</el-button
        >
        <el-button v-else  type="success" @click="confirmAddTicket()"
          >添加</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.red-font {
  color: red;
}
h3 {
  color: white;
}
/* h3 {
  margin: 40px 0 0;
} */
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

.ticket {
  background: #00000080;
  min-height: 91vh;
  padding-top: 30px;
  position: relative;
}
.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.png) no-repeat fixed;
  background-size: 100% 100%;
  top: -30px;
  z-index: -999;
}
.table-box {
  /* display: flex;
  justify-content: center; */
  margin-bottom: 20px;
}
.table-data {
  width: 90%;
  margin: 0 auto;
  min-height: 60vh;
  border-radius: 10px;
}

/* 弹窗 */
.card-body {
  display: flex;
  justify-content: left;
}
.card-row {
  width: 50%;
}
.card-row div {
  font-size: 16px;
  text-align: left;
  padding: 10px 0;
}
.ma {
  position: absolute;
}
.ma > img {
  width: 150px;
}

.btn-del {
  position: absolute;
  top: 10px;
  right: 10px;
}

.el-table .el-table__cell {
  padding: 8px 0;
}
.el-pagination {
  padding-bottom: 40px;
}
.update-dialog{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
<style>
.font-white .el-form-item__label {
  color: white;
}

/* 弹窗 */
.el-dialog__header {
  text-align: left;
  background: #234296;
}
.el-dialog__header span {
  color: white;
}

.card .el-form-item__label {
  font-size: 16px;
  color: #224997;
}
.el-radio__label {
  font-size: 16px;
}
</style>

<script>
import {
  api_getALlTicket,
  api_getTicket,
  api_selectTicket,
  // api_OrderAdd,
  api_ticketDel,
  api_ticketAdd,  
  api_ticketUpdate,
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
      date1: "2023-6-6",
      date2: "2023-6-6",
      time1: "00:00",
      time2: "00:00",
      pages: 0, //总页数
      nowPage: 0,
      dialogFormVisible: false,
      updatedialogFormVisible: false,
      updatedialogTitle:"修改",
      isupdate: true,
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
        this.pages = Number(res.data.pages);
      } else {
        this.$message({
          message: res.msg,
          type: "error",
        });
        //todo
        //this.$router.replace("/login");
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
      if (!this.form.fromCity) {
        this.form.fromCity = null;
      }
      if (!this.form.targetCity) {
        this.form.targetCity = null;
      }
      const { data: res } = await api_getTicket(
        this.form.fromCity,
        this.form.targetCity,
        this.form.date1,
        this.nowPage
      );
      this.data = res.records;
    },
    delTicket(index, row) {
      console.log("delTicket::::", row);
      console.log("test::::", this.data[index].id);
      this.dialogData = this.data[index];
      console.log(this.dialogData);
      this.dialogFormVisible = true;
    },
    addTicket(){
      this.updatedialogTitle = "添加";
      this.isupdate = false;
      this.dialogData = {
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
      };
      
      // console.log("test::::", this.data[index].id);
      ///this.dialogData = this.data[index];
      
      console.log(this.dialogData);
      this.updatedialogFormVisible = true;
    },
    updateTicket(index, row){
      this.updatedialogTitle = "修改"
      this.isupdate = true;
      console.log("addTicket::::", row);
      console.log("test::::", this.data[index].id);
      this.dialogData = this.data[index];
      console.log(this.dialogData);

      this.date1 =  this.dialogData.departureTime.toString().substring(0,10);
      this.time1 = this.dialogData.departureTime.toString().substring(11,16)

      this.date2 =  this.dialogData.arrivalTime.toString().substring(0,10);
      this.time2 = this.dialogData.arrivalTime.toString().substring(11,16)


      this.updatedialogFormVisible = true;
    },
    //confirmAddTicket  confirmUpdateTicket
    async confirmAddTicket() {
        console.log("confirmAddTicket");
        console.log(this.dialogData);
        this.updatedialogFormVisible = false;
        // todo 
        this.dialogData.businessClass = "200", //座位
        this.dialogData.firstClass = "200",
        this.dialogData.secondClass = "200";

        if(this.time1 == ""){
          this.time1 = "00:00"
        }else{
          this.time1 = this.time1.toString().substring(15,21)
        }

        if(this.time2 == ""){
          this.time2 = "00:00"
        }else{
          this.time2 = this.time2.toString().substring(15,21)
        }

        this.dialogData.departureTime = this.date1.toString().substring(0,10) +" "+ this.time1;
        this.dialogData.arrivalTime  = this.date2.toString().substring(0,10) +" "+ this.time2;

        this.date1 = "";
        this.date2 = "";
        this.time1 = "";
        this.time2 = "";
        
        console.log(this.dialogData);
        const res = await api_ticketAdd(this.dialogData);
        console.log(res);
        if (res.status == 10000) {
            this.getData();
          } else {
            this.$message({
              message: res.msg,
              type: "error",
            });
            //todo
            //this.$router.replace("/login");
          }
          
    },
    async confirmUpdateTicket() {
        console.log("confirmUpdateTicket");
        console.log(this.dialogData);
        this.updatedialogFormVisible = false;
        //todo
        if(this.date1 != ""){
          this.dialogData.departureTime = this.date1.toString().substring(0,10) +" "+ this.time1.toString().substring(15,21);
        }
        if(this.date2 != ""){
          this.dialogData.arrivalTime  = this.date2.toString().substring(0,10) +" "+ this.time2.toString().substring(15,21);
        }


        console.log(this.dialogData);
         const res = await api_ticketUpdate(this.dialogData);
         console.log(res);
         if (res.status == 10000) {
            this.getData();
          } else {
            this.$message({
              message: res.msg,
              type: "error",
            });
            //todo
            //this.$router.replace("/login");
          }
    },
    async confirmDelTicket() {
      this.dialogFormVisible = false;

      console.log("删除信息");
      const res = await api_ticketDel(this.dialogData);
      console.log(res);
      if (res.status == 10000) {
        this.getData();
      } else {
        this.$message({
          // message: res.msg,
          message: "您不能删除已存在订单的机票",
          type: "error",
        });
        //todo
        //this.$router.replace("/login");
      }

      // ******************
      // console.log(this.dialogData.id);
      // const res = await api_OrderAdd(this.dialogData);
      // console.log(res);
      // if (res.status == 10000) {
      //   this.$message({
      //     message: "预订成功",
      //     type: "success",
      //   });
      // } else {
      //   this.$message({
      //     message: res.msg,
      //     type: "error",
      //   });
      // }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
