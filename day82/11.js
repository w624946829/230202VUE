(function() {

  var MyPlugin = {}
  window.MyPlugin = MyPlugin

  MyPlugin.install = function (Vue, options) {
    console.log(Vue) // Vue构造函数
    console.log(options)

    // 1. 添加全局方法或 property
    Vue.myGlobalMethod = function () {
      // 逻辑...
      console.log('执行了类方法 myGlobalMethod')
    }
  
    // 2. 添加全局资源
    Vue.directive('my-directive', {
      bind (el, binding, vnode, oldVnode) {
        // 逻辑...
        console.log('绑定了my-directive指令')
      }
      // ...
    })
  
    // 3. 注入组件选项
    // Vue.mixin({
    //   created: function () {
    //     // 逻辑...
    //   }
    //   // ...
    // })
  
    // 4. 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
      // 逻辑...
      console.log('调用了$myMethod')
    }
  }


})()