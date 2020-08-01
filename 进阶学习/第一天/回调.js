// node 中的文件操作都是异步的
let fs = require('fs');

// 异步的解决方案，最早是基于回调函数的
fs.readFile('./age.txt', 'utf8', function(error, data) {
  console.log(error, data);
  // renderObj['age'] = data;
  out('age', data);
});

fs.readFile('./name.txt', 'utf8', function(error, data) {
  console.log(data);
  // renderObj['name'] = data;
  out('name', data);
});

let out = after(2, function(renderObj) {
  console.log(renderObj);
})

function after(times, callback) {
  let renderObj = {};
  return function(key, data) { // out
    renderObj[key] = data;
    if (--times === 0){
      callback(renderObj);
    }
  }
}

// 发布订阅
// 观察者模式