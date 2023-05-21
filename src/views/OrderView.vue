<template>
  <div class="order">
    <h1>This is an Order page</h1>
    <!-- <TicketCard msg="Welcome to Your Vue.js App"/> -->
    <div class="order-box">
      <HelloWorld :msg="order" v-for="order in orders" :key="order.id" />
    </div>

    <!-- <TicketCard msg = "123" /> -->
  </div>
</template>

<style scoped>
.order-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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



