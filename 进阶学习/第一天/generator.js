let fs = require("fs");
let path = require("path");
let { promisify } = require("util");
// const Promise = require('./promise');

function resolve(dir) {
  return path.join(__dirname, dir);
}

// generator 生成器，生成的是迭代器

// 普通函数执行时没有停止的功能，generator函数，可以暂停
/* 
function * read() {
  yield 1; // 产出，遇到yield就可以停止了
  yield 2;
  yield 3;
  yield 4;
}

let it = read(); // iterator 迭代器中包含一个next方法
// console.log(it.next()); // {value, done}
// console.log(it.next());

let done = false;
while (!done) {
  let obj = it.next();
  done = obj.done;
  console.log(obj.value);
}
*/

/* function * read() {
  let a = yield 1;
  console.log(a);
  let b = yield 2;
  console.log(b);
  let c = yield 3;
  console.log(c);
}

let it = read();
it.next('hello'); // 遇到yeild就停止了，第一次不会打印
it.next('world'); // next传递的值会给上一个yeild的返回值 */

// 使用gennrator解决异步问题
const read = promisify(fs.readFile);

function* readAge() {
  const content = yield read(resolve("./name.txt"), "utf8");
  const age = yield read(resolve(content), "utf8");
  return age;
}

function co(it) {
  return new Promise((resolve, reject) => {
    // 异步迭代,需要next函数
    function next(res) {
      let { value, done } = it.next(res);
      if (done) {
        resolve(value);
      } else {
        // 如果不是Promise，就包装成Promise
        Promise.resolve(value).then((data) => {
          next(data);
        }, reject);
      }
    }
    next(); // 依次调用next，返回最终的值
  });
}
// 一次执行生成器，不停的调next方法
co(readAge()).then((data) => {
  console.log(data);
});

// generator 也支持try-catch
function* trycatch() {
  try {
    yield 100;
  } catch (e) {
    console.log("err", e);
  }
}
let g = trycatch();
g.next();
g.throw("错误了"); // 往下走的时候，也支持手动抛错

/*
let it = readAge();
let {value} = it.next();
value.then(data => {
  console.log('......', data);
  let { value } = it.next(data);
  value.then(data => {
    console.log(data);
  })
})
*/

// async await 的原理就是 generator

async function test() {
  let res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve("ok");
    }, 1000);
  });
  return res;
}

test().then((data) => {
  console.log(data);
});
