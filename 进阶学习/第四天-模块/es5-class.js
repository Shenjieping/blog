// prototype __proto constructor
// es5中没有类，只有构造函数，可以把一个函数当做类


// 实现只能通过new来调用
var Animal = (function() { // 用ES5来模拟一个ES6的类型。也就是不能直接调用，只能通过new来调用
  function Animal() {
    if (!(this instanceof Animal)) {
      throw new Error('不是new调用的');
    }
    this.name = 'shenjp';
  }
  // 给原型上添加方法
  defineProperty(Animal, [
    {
      key: 'say',
      value: function() {}
    },
    {
      key: 'et',
      value: function() {}
    },
  ], [
    {
      key: 'getAge',
      value: function() {
        console.log('static');
      }
    }
  ])
  return Animal;
})();

function defineProperty (Constructor, protoProps, staticProps) {
  if (protoProps) {
    define(Constructor.prototype, protoProps);
  }
  if (staticProps) {
    define(Constructor, staticProps);
  }
}

function define(target, props) {
  if (Array.isArray(props)) {
    for (let i = 0; i < props.length; i++) {
      let property = props[i];
      Object.defineProperty(target, property.key, {
        enumerable: true,
        configurable: true,
        ...property
      });
    }
  }
}



/* function Animal() {
  this.name = 'shenjp';
}
Animal.prototype.say = function() { // 标识公共方法
  console.log('heheh');
} */

let animal = new Animal(); // 如果没有返回值，构造函数中的this,默认指向实例，如果返回了引用类型的值，则this指向返回的结果
console.log(Animal.prototype);

Animal.getAge();

// Animal(); 不能直接调用