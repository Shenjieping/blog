const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) {
    this.status = PENDING; // 默认是等待态
    this.value = undefined; // 成功的原因
    this.reason = undefined; // 失败的原因
    this.onResolvedCallbacks = []; // 存放成功的回调函数
    this.onRejectedCallbacks = []; // 存放失败的回调函数
    let resolve = (value) => {
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
    if (this.status === RESOLVED) {
      onfulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onrejected(this.reason);
    }
    if (this.status === PENDING) { // 说明executor是异步的
      // 基于发布订阅模式实现函数存储
      this.onResolvedCallbacks.push(() => {
        onfulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onrejected(this.reason);
      });
    }
  }
}

module.exports = Promise;