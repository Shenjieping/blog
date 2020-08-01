// 低版本的IE不支持，需要polilly去支持
// promise 内部会提供两个方法，可以更改Promise的状态
// Promise有三个状态：等待态，成功态，失败态
const Promise = require('./promise');

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok11');
  }, 1000);
  // console.log('ok')
});

promise.then(data => {
  return new Promise((resolve, reject) => {
    resolve(new Promise((resolve, reject) => {
      resolve('1123')
    }));
  })
}).then(data => {
  console.log(data);
}, (err) => {
  console.log('...', err);
})

/* promise.then((data) => { // onfulfilled
  console.log(data);
  return data;
}, (err) => { // onrejected
  console.log(err);
}).then(data => {
  console.log(data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('next');
    }, 1000);
  });
}).then(data => {
  console.log(data);
  return new Promise((resolve, reject) => {
    reject('失败');
  });
}, () => {}).then(() => {}, (err) => {
  console.log(err);
}) */


// then 中返回的是一个普通值，或者一个成功的Promise，会走下一个then的成功

/* 
  step1: 引用同一个对象
    let promise2 = new Promise(() => {
      return promise2; // 返回值又引用了自己
    });
    promise2.then(() => {

    }, (e) => {
      console.log(e); // Type Error
    });
  stpe2: 判断x的类型，如果是对象或者函数，说明有可能是一个Promise
 */


