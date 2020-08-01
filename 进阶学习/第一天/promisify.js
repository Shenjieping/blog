let fs = require('fs');
let path = require('path');
// let {promisify} = require('util');
const Promise = require('./promise');

function resolve (dir) {
  return path.join(__dirname, dir)
}

/*
function read (...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}
*/
/* function read (...args) {
  let dfd = Promise.defer(); // 延迟对象，可以解决Promise的嵌套问题（原生没有此方法）
  fs.readFile(...args, (err, data) => {
    if (err) dfd.reject(err);
    dfd.resolve(data);
  });
  return dfd.promise;
} */

function promisify (fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) reject(err);
        resolve(data);
      })
    })
  }
}

// 可以将异步的方法转为Promise
let readFile = promisify(fs.readFile);

readFile(resolve('./name.txt'), 'utf8').then(data => {
  console.log(data);
})
.catch(err => {
  console.log(err);
})