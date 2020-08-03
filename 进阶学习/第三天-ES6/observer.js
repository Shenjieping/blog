let obj = {
  name: 'shenjp',
  age: { // 如果是对象要递归给他加上get/set
    a: 100
  }
};
/* 
  proxy
    不需要重写对象的 set/get
    如果属性不存在，defineProperty 无法监控到，proxy可以解决
    defineProperty数组的方法无法监控，proxy也可以解决
 */

function update() {
  console.log('跟新数据');
}

function observer(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return;
  }
  for(let key in obj) {
    defineReactive(obj, key, obj[key]);
  }
}

function defineReactive(obj, key, value) {
  observer(value); // 递归增加get/set
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: false,
    get() {
      return value;
    },
    set(newValue) {
      if (typeof obj === 'object' && obj !== null) {
        observer(newValue); // 如果增加的是对象，也要添加get/set
      }
      update();
      value = newValue;
    }
  });
}

observer(obj);
obj.age = {b: 1};
obj.age.b = 100;
console.log(obj.age);

// 如果数据类型是数组，是无法监控到变化的
// 他的原理就是将 push, pop 等方法重写