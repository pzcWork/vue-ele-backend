import router from '@/router'
import store from '@/store'
//路由判断 设置vuex

// router.beforeEach((to, from, next) => {
//     if(to.name != 'login'&&to.name!='register' &&to.name!='forgotPass'){
//         next('/login')
//     // store.dispatch("getUserInfo").then(() => {

//     //     if (store.state.user.userInfo) {
//     //     if(to.name == 'login'||to.name == 'register'&&to.name!='forgotPass'){
//     //         next('/home/index');
//     //     }else{
//     //         next();
//     //     }

//     //     }else{
//     //         if(to.name == 'login' || to.name == 'register' &&to.name!='forgotPass'){
//     //             next()
//     //         }else{
//     //             next('/login')
//     //         }
//     //     }

//     // })
// }else{
//     next();
// }

// })
router.afterEach((to, from, next) => { // 滚动条行为

});

export default {}