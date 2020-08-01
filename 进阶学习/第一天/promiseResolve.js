// Promise.resolve
const Promise = require('./promise');


let p = new Promise((resolve, reject) => {
  resolve(new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(111);
    }, 1000);
  }));
});

p.then(data => {
  console.log(data);
})

Promise.resolve = function(value) {
  return new Promise(resolve => {
    resolve(value);
  });
}
Promise.reject = function(value) {
  return new Promise((resolve, reject) => {
    reject(value);
  });
}

// 一上来就创建一个成功的Promise
Promise.resolve(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('1112');
  }, 1000);
})).then(data => {
  console.log(data);
});

// 作业 Promise.finally