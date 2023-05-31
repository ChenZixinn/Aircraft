<template>
  <div class="order">
    <div class="mask"></div>
    <!-- <h1>This is an Order page</h1> -->
    <!-- <TicketCard msg="Welcome to Your Vue.js App"/> -->
    <div class="order-box">
      <HelloWorld :msg="order" v-for="order in orders" :key="order.id" />
    </div>

    <!-- <TicketCard msg = "123" /> -->
  </div>
</template>

<style scoped>
.order{
  background: #00000080 ;
  min-height: 95vh;
}
.order-box {
  padding: 30px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  position: relative;
}
.mask{
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.png) no-repeat fixed;
  background-size: 100% 100%;
  top: -30px;
  z-index: -999;
}
</style>

<script>
// @ is an alias to /src
//import TicketCard from '@/components/TicketCard.vue'
import HelloWorld from "@/components/HelloWorld.vue";
//import TicketCard from '@/components/TicketCard.vue'

import { api_getAllOrder } from "../api/admin.js";

export default {
  name: "TicketCard",
  components: {
    //TicketCard,
    HelloWorld,
  },
  data() {
    return {
      orders: {},
    };
  },
  methods: {
    async init() {
      const res = await api_getAllOrder();
      console.log(res);
      if (res.status == 10000) {
        this.orders = res.data.records;
      } else {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>



