// Object.defineProperty
// 定义属性 Object.freeze()冻结

let obj = {name: '123'};
let val = 'shenjp'
Object.freeze(obj); // 用了此方法，这个对象不能被添加 get/set方法
Object.getOwnPropertyDescriptor(obj, 'name'); // 可以用来提示vue的性能
Object.defineProperty(obj, 'name', {
  configurable: true, // 这个属性是否可以被删除
  // value: 123, // 不常用
  enumerable: true, // 是否可枚举，也就是是否可以被 for...in 循环
  get() { // 取值
    return val;
  },
  set(newValue) {
    newValue = val;
  }
});
