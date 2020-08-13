// 1. 反柯理化 目的是扩大函数的作用范围

const { resolve } = require("path");
const { reject } = require("async");

// let res = Object.prototype.toString.call({name: 'shenjp'});
// console.log(res);

function uncurring(fn) {
  return function(context, ...args) {
    // return fn.call(context, ...args); // 直接调用可能会调用别人实例上的方法
    // 保证一定是调用的原型上的方法
    // 将fn执行，并且将后续的参数传递给apply方法
    // return Function.prototype.apply.call(fn, context, args);
    // 以上方法可以用Reflect简写
    return Reflect.apply(fn, context, args);
  }
}

let toString = uncurring(Object.prototype.toString);

let res = toString({name: 'shenjp'});
// console.log(res);

let join = uncurring(Array.prototype.join);
let res2 = join([1, 2, 3, 4], ':');
// console.log(res2);


// 2. promise.race
// 多个Promise，谁先执行完，就执行谁的

let p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('p1 resolve');
  }, 100);
});

let p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('p2 resolve');
  }, 200);
});

function isPromise(value) {
  return value instanceof Promise;
}

Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new TypeError('promises is not Array');
    }
    promises.forEach((current) => {
      if (isPromise(current)) {
        current.then(resolve, reject);
      } else {
        resolve(current);
      }
    })
  })
}

// Promise.race([p1, p2]).then(res => {
//   console.log(res);
// })

// 3. wrap 可以包裹一个Promise，并且给这个Promise提供一个abord方法，可以让Promise变成失败态

function wrap(p1) {
  // 在内部再构建一个Promise，这个Promise，我可以将他的失败方法暴露在abort上
  // 如果用户调用了abort，会让这个Promise.race立即失败
  let abort  = null;
  let p = new Promise((resolve, reject) => {
    abort = reject;
  })
  let newPromise  = Promise.race([p1, p]);
  newPromise.abord = abort;
  return newPromise;
}

let p = wrap(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok'); // 走完后只是抛弃掉了
  }, 3000);
}));

p.then((data) => {
  console.log(data);
}, err => {
  console.log(err);
})

// 如果超过2s，这个Promise的成功结果就不要了
setTimeout(() => {
  p.abord('超时');
}, 5000);


// finally
Promise.prototype.finally = function(callback) {
  // finally 是then的简写
  return this.then((value) => {
    // Promise.resolve 具备等待效果
    return Promise.resolve(callback()).then(() => value);
  }, (err) => {
    return Promise.resolve(callback()).then(() => {throw err});
  });
}

Promise.reject('123').finally(() => {
  console.log('finally ok');
  return new Promise((resolve) => { // 这里可以返回Promise，下一个.then 执行会等这里的Promise执行完之后再往下走
    setTimeout(() => {
      resolve('ok');
    }, 3000);
  })
}).catch(err => {
  console.log(err);
});


// try 如果代码是同步的，如果出错了，我希望是同步执行

function fnc() {
  throw new Error('1122');
}

Promise.resolve(fnc()).catch(err => { // then是异步的，会延迟抛出错误
  console.log('..........', err);
});

console.log(456);


// mergeOptions
function mergeOptions (o1, o2) {
  if (typeof o1 !== typeof o2 || o1.constructor !== o2.constructor) {
    return o2;
  }
  // 数组 对象
  if (Array.isArray(o1)) {
    return [...new Set([...o1, ...o2])];
  }
  // 其他的就是对象
  for (let key in o2) {
    if (o1.hasOwnProperty(key) && typeof o2[key] === 'object') {
      mergeOptions(o1[key], o2[key]);
    } else {
      o1[key] = o2[key];
    }
  }
  return o1;
}

let obj1 = {a: 1, d: [1, 2, 3]};
let obj2 = {a: 2, b: 3, c: {a: 1}};
let res = mergeOptions(obj1, obj2);
console.log(res);
