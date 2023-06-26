/*
 * @Author: 王泽昌 624946829@qq.com
 * @Date: 2023-06-26 19:27:37
 * @LastEditors: 王泽昌 624946829@qq.com
 * @LastEditTime: 2023-06-26 20:50:05
 * @FilePath: \day100\守卫的理论.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

router.beforeEach(async (to, from, next) => {
    // 1、首先从localStroage中读取token
    const token = getToken()
    //2、进入首次判定，是否存在token
    if(token){
        // 3.1、这里是存在token的情况，
        console.log('读取到token，所以是登录过的，接下来vuex中是否有相关信息');
        // 从vuex中获取用户信息
        const {info} = store.state.user;
        // 4、进行判断vuex中是否有用户的信息
        if(info.id){
            // 5.1、这里判断vuex中是否存在相关数据，可以关联到3.1循环，可以进入下一步
            console.log('拥有信息，访问无碍');
            next();
        }else{
            // 5.2、这里vuex中不存在相关数据，需要调用vuex进行获取
            console.log('你拥有token但是你没有vuex中的相关信息，我去找到vuex中的服务员函数帮你进行申请');
            try {
                // 6.1、获取vuex中的用户信息成功，继续下一步操作
                await store.dispath('user/getUserInfo')
                console.log('根据你的token获取vuex中的信息成功，访问无碍');
                next();
            } catch (error) {
                // 6.2、获取vuex中的用户信息失败，删除并且，重定向回去
                console.log('根据你的token获取vuex中的信息失败，删除不合法的token并且重定向到登录');
                deleteToken();
                next('/login')
            }

        }


    }else{
        // 3.2、这里不存在token的情况，代表没有进行登录等操作 直接进行敏感路由判定
        console.log('因为你的token不存在，所以有些路由不能看，同时受到部分路由限制，但由于现在还未配置相关敏感路由，暂且全部访问');
        next();//目前是这样后续再进一步限制
    }

})

