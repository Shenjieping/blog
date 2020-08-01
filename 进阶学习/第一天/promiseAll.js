let fs = require('fs');
let path = require('path');
let {promisify} = require('util');
const Promise = require('./promise');

function resolve (dir) {
  return path.join(__dirname, dir)
}

let read = promisify(fs.readFile);

function isPromise(promise) {
  if ((typeof promise === 'object' && promise !== null) || typeof promise === 'function') {
    if (typeof promise.then === 'function') {
      return true;
    }
    return false;
  }
  return false;
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let arr = [];
    let idx = 0;
    let processData = (value, index) => {
      arr[index] = value;
      if (++idx === promises.length) {
        resolve(arr);
      }
    }
    for(let i = 0; i < promises.length; i++) {
      let currentValue = promises[i];
      if (isPromise(currentValue)) {
        currentValue.then(y => {
          processData(y, i);
        },reject)
      } else {
        processData(currentValue, i);
      }
    }
  })
}

// 如果全成功了才会成功，只要有一个失败就失败了
Promise.all([read(resolve('./name.txt'), 'utf8'), 1, 2, 3, read(resolve('./age.txt'), 'utf8')])
  .then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  });

// 实现promise.race