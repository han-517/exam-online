import router from '@/router'
import store from '@/store'

const whiteList = ['/login', '/register']

router.beforeEach((to, from, next) => {
    if(store.state.id !== ''){
        if(to.path === '/login') {
            next({path: '/home'})
        }
        else {
            next()
        }
    }
    else {
        if(to.path !== '/login' && whiteList.indexOf(to.path) === -1) next('/login')
        else next()
    }
    // console.log(store.state.id)
})
