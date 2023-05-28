/**
 第一个参数：给哪个对象添加属性
第二个参数：属性名
第三个参数：属性值，和描述符
*/
Object.defineProperty();
// 第三个参数中有三个描述符
writable: false; //默认不允许修改
configurable: false;
enumerable: false; //默认不允许枚举（被循环）

/**
 * 第一次参数：给哪个对象添加属性
 * 第二个参数：是对象，对象中的key是属性名， 值还是对象
 * */
Object.definePropertyes(Animal.prototype, {
  eat: {
    value: function () {
      console.log("吃饭");
    },
  },
  doc: {
    value: function () {
      console.log("bang");
    },
  },
});
