const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
// const Promise = require('./promise');

function resolve (dir) {
  return path.join(__dirname, dir)
}

const read = promisify(fs.readFile);

function isPromise(promise) {
  if ((typeof promise === 'object' && promise !== null) || typeof promise === 'function') {
    if (typeof promise.then === 'function') {
      return true;
    }
    return false;
  }
  return false;
}

Promise.race = function(arr) {
  //
}


// 如果全成功了才会成功，只要有一个失败就失败了
Promise.race([read(resolve('./name.txt'), 'utf8'), read(resolve('./age.txt'), 'utf8')])
  .then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  });

// 实现promise.race