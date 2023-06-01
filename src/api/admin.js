//登录相关的请求

import axios from '../plugins/http.js'

/**
 * 登出
 * @param username
 * @param password
 * @returns {Promise<AxiosResponse<any>>}
 */
// export function api_login(password,username){
//     return axios.post("/login",{
//         username,password   // es6的语法，相同值省略了赋值的方式
//     })
// }

/**
 * 登出
 * @returns {Promise<AxiosResponse<any>>}
 */
export function api_loginOut() {
    return axios.post("")
}
/*
 * 获取用户信息
 * */
export function api_info() {
    return axios.get("");
}
// ******************************   用户模块
// 登录
export function api_login(data) {
    // console.log(data.username);
    // console.log(data.password);
    return axios.post("/login?username=" + data.username + "&password=" + data.password + "&remember-me=" + true, {

    })
}

//注册
export function api_admin_add(data) {
    console.log(data.address);
    console.log(data.password);
    console.log(data.phone);
    console.log(data.realName);
    console.log(data.name);
    return axios.post("/register", {
        address: data.address,
        password: data.password,

        phone: data.phone,
        realName: data.realName,
        username: data.username
    })
}

// 退出登录

// 更新
export function api_admin_update(data) {
    console.log(data.address);
    console.log(data.password);
    console.log(data.phone);
    console.log(data.realName);
    return axios.post("/user/update_user", {
        address: data.address,
        password: data.password,
        phone: data.phone,
        realName: data.realName,
    })
}


// ******************************   机票信息模块

export function api_selectTicket(fromCity, targetCity, departureTime) {
    return axios.get('/ticket/list', {
        params: {
            fromCity: fromCity,
            targetCity: targetCity,
            departureTime: departureTime,
        }
    })
}

export function api_getTicket(fromCity,targetCity,departureTime,nowPage) {
    return axios.get('/ticket/list/', {
        params: {
            fromCity: fromCity,
            targetCity: targetCity,
            departureTime: departureTime,
            pageNum: nowPage
        }
    })
}

// /api/ticket/cancel
//机票删除
export function api_ticketDel(data) {

    return axios.post("/ticket/cancel", {}, {
        params: {
            ticketId: data.id,
        }
    })
}

//机票添加
export function api_ticketAdd(data) {  

    return axios.post("/ticket/create", {}, {
        params: {
            arrivalTime: data.arrivalTime,
            businessClass: data.businessClass,
            departureTime: data.departureTime,
            firstClass: data.firstClass,
            fromCity: data.fromCity,
            id: data.id,
            number: data.number,
            price: data.price,
            secondClass: data.secondClass,
            status: data.status,
            targetCity: data.targetCity,
        }
    })
}
//机票更新
export function api_ticketUpdate(data) {

    console.log(data.arrivalTime);
    console.log(data.departureTime);

    return axios.post("/ticket/update", {}, {
        params: {
            arrivalTime: data.arrivalTime,
            businessClass: data.businessClass,
            departureTime: data.departureTime,
            firstClass: data.firstClass,
            fromCity: data.fromCity,
            id: data.id,
            number: data.number,
            price: data.price,
            secondClass: data.secondClass,
            status: data.status,
            targetCity: data.targetCity,
        }
    })
}


export function api_getALlTicket() {
    return axios.get('/ticket/list')
}

// ******************************   订单模块

//订单取消
export function api_OrderAdd(data) {

    return axios.post("/order/create", {}, {
        params: {
            ticketId: data.id,
            type: data.type
        }
    })
}

//订单创建



//订单列表

export function api_getAllOrder() {

    return axios.get("/order/list");
}
//退出登陆

export function api_logout() {

    return axios.get("/user/logout");
}
export function api_userinfo() {

    return axios.get("/user/userinfo");
}

//订单取消

export function api_cancel_order(oid) {

    return axios.post("/order/cancel", {}, {
        params: {
            orderId: oid
        }
    });
}