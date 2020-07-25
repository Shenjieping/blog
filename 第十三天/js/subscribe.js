(function() {
  /* 
    真实项目中封装（类库，插件等）都是基于面向对象的思想
      1. 创建类和类的实例，每个实例之间是相互独立的，有自己的私有属性方法，还能拥有公共的属性和方法
      2. 只要保证方法中的this是实例，这样各个方法中就可以实现信息的通信
   */
  /*
  // ES5
  function Sub() {}

  Sub.prototype = {
    constructor: Sub
  }
  */

  // ES6
  const hasOwn = Object.prototype.hasOwnProperty;
  class Sub {
    constructor () {
      this.pond = {};
    }
    // 向事件池中添加方法
    $on(type, func) {
      // 每次增加的时候，都要判断是否存在自定义事件
      let pond = this.pond,
          arr = null;
      !hasOwn.call(pond, type) ? pond[type] = [] : null
      arr = pond[type];
      !arr.includes(func) && arr.push(func);
    }
    $off(type, func) {
      // 从事件池中移除方法
      let pond = this.pond,
          arr = null;
      arr = pond[type];
      if (!arr) {
        return;
      }
      for (let i = 0; i < arr.length; i++) {
        if (func === arr[i]) {
          // splice 删除会改变原来的数字（后面的所有项都会改变索引）
          // 为了防止数组塌陷问题，我们在移除的时候，不能改变数组结构，而是把当前项赋值为null
          arr.splice(i, 1, null);
          break;
        }
      }
    }
    $emit(type, ...args) {
      // 通知方法执行
      let pond = this.pond,
          arr = null;
      arr = pond[type];
      if (!arr) {
        return;
      }
      arr.forEach(item => typeof item === 'function' && item(...args));
    }
  }

  // 暴露给全局用的API
  window.subscribe = function subscribe () {
    return new Sub();
  }
})();
