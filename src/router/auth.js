import router from './index'

const  whileList=['/login']//白名单
router.beforeEach((to, from, next) =>{
    // console.log(to);
    // console.log(from);
    //to.path=='/login'
    if(whileList.indexOf(to.path)!=-1){
        next()
        console.log("路由守卫 ===白名单");
    }else{
        const token = window.sessionStorage.getItem('token');
        if(token){
            next()
            console.log("路由守卫 ===登录");
            console.log(token);
        }else{
            next()
            // next({ name: 'Login' })
            console.log("路由守卫 ===todo");
        }
    }

} )