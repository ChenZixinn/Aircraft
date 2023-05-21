import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios) //在 vue对象中挂载$http属性

axios.defaults.baseURL = 'api/';
axios.defaults.timeout = 7000;
axios.defaults.headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
}

//方式一创建实例
// const instance = axios.create({
//     baseURL: 'https://api.example.com',
//     timeout: 7000,
// });

//拦截器
// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        //绑定header中
        const token = window.sessionStorage.getItem('token')
        if (token) {
            config.headers['Authorizaton'] = token;
        }
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        console.log(response);
        // 对响应数据做点什么
        return response.data;
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });

// export default instance; //导出
export default axios;