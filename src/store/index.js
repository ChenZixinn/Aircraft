import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      address: '广东省广州市天河区',
      password: '1233123',
      id: '2',
      phone: '12345674567',
      realName: '张三',
      username: 'pande',
    },
    isLogin: false,
  },
  getters: {},
  mutations: {
    updateUserInfo(state, payload) {
      state.userInfo = payload;
    },
    changeLoginState(state, x) {
      console.log("store:::::123", x);
      state.isLogin = x;
    }

  },
  actions: {},
  modules: {}
})