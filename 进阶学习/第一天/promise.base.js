const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) {
    this.status = PENDING; // 默认是等待态
    this.value = undefined; // 成功的原因
    this.reason = undefined; // 失败的原因
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED;
      }
    }
    let reject = (reason) => {
      if (this.status === PENDING) { // 只有是pending的时候才能更改状态
        this.reason = reason;
        this.status = REJECTED;
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
  }
}

module.exports = Promise;