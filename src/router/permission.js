import router from "../router";

const whiteList = ['/login', '/register'] // no redirect whitelist

let hasLogin = false //测试

router.beforeEach((to, from, next)=>{
    if(hasLogin){
        if(to.path === '/login'){
            next('/')
        }
        else{
            next()
        }
    }
    else{
        if(whiteList.indexOf(to.path) !== -1){
            next()
        } else {
            next('/login')
        }
    }
})