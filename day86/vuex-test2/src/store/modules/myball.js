// 用于响应组件中的“动作” ---服务员
const actions = {
    add(){
        console.log('user-add');
    }
};
// 用于真正操作数据
const mutations = {};

//初始化的数据
const state = {
    name:"mingming",
    age:999

}

export default {
    namespaced:true, //命名空间
    actions,
    mutations,
    state
}

