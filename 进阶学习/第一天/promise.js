const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

function resolvePromise (promise2, x, resolve, reject) {
  // 判断Promise的状态
  // 为了兼容所有的Promise，多个库执行的流程是一样的
  // 1. 不能引用同一个对象
  if (promise2 === x) {
    return reject(new TypeError('循环引用了'));
  }
  let called; // 防止一个Promise即调用了成功又调用了失败
  // 2. 判断x的类型，如果是对象或者函数，说明有可能是一个Promise
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 可能是Promise
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, y => { // 只取一次值
          // resolve(y); // 当前解析出来的结果可能还是一个Promise,需要继续解析，直到是普通值为止
          if (called) return;
          called = true;
          resolvePromise (promise2, y, resolve, reject);
        }, r => {
          if (called) return;
          called = true;
          reject(r);
        })
      } else {
        resolve(x); // 可能是 {x: 1, then: 2}
      }
    } catch (e) { // 取值失败，就走到失败中
      if (called) return;
      reject(e);
      called = true;
    }
  } else {
    // 普通值直接返回成功
    resolve(x);
  }
}

class Promise {
  constructor(executor) {
    this.status = PENDING; // 默认是等待态
    this.value = undefined; // 成功的原因
    this.reason = undefined; // 失败的原因
    this.onResolvedCallbacks = []; // 存放成功的回调函数
    this.onRejectedCallbacks = []; // 存放失败的回调函数
    let resolve = (value) => {
      if (value instanceof Promise) { // 可能在resolve中也是一个Promise
        value.then(value => {
          resolve(value); // 递归解析，直到是普通值为止
        }, reject);
        return;
      }
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED;
        // 让成功的方法依次执行
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    }
    let reject = (reason) => {
      if (this.status === PENDING) { // 只有是pending的时候才能更改状态
        this.reason = reason;
        this.status = REJECTED;
        // 让失败的方法依次执行
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }
    // 执行executor 传入成功和失败
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error); // 如果内部出错，直接reject
    }
  }
  then(onfulfilled, onrejected) {
    // 如果没传，则给一个默认参数
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : v => v;
    onrejected = typeof onrejected === 'function' ? onrejected : e => {throw e};

    let promise2 = new Promise((resolve, reject) => { // 为了使用链式调用，每次都返回一个新的Promise
      if (this.status === RESOLVED) {
        // 执行then中的方法可能返回的是普通值或者是Promise，这里需要判断，如果是Promise，需要让Promise执行，并且采用他的状态，作为Promise的成功或者失败
        setTimeout(() => { // 需要异步执行，不然拿不到promise2
          try {
            let x = onfulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject); // 判断x的状态
          } catch (e) { // 一旦执行then方法中出错，就走到外层then的失败函数中
            reject(e);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onrejected(this.reason);
            resolvePromise(promise2, x, resolve, reject); // 普通值都会成功
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === PENDING) { // 说明executor是异步的
        // 基于发布订阅模式实现函数存储
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onfulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onrejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
  catch(errCallback) {
    return this.then(null, errCallback);
  }
}

// 用于测试写的代码是否符合Promise规范
// 安装：npm install -g promises-aplus-tests
// promises-aplus-tests promise.js
Promise.defer = Promise.deferred = function() {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}

module.exports = Promise;

