let fs = require('fs');

let e = {
  _obj: {},
  _callback: [],
  on(callback) { // 订阅就是将函数放到数组中
    this._callback.push(callback);
  },
  emit(key, value) {
    this._obj[key] = value;
    this._callback.forEach(method => method(this._obj));
  }
}

// 异步的解决方案，最早是基于回调函数的
fs.readFile('./age.txt', 'utf8', function(error, data) {
  // console.log(error, data);
  e.emit('age', data)
});

fs.readFile('./name.txt', 'utf8', function(error, data) {
  // console.log(data);
  e.emit('name', data)
});

// 订阅好一件事，当事件发生的时候，触发对应的函数

// 订阅 => on   发布 => emit
e.on(function(obj) { // 每次发布都会触发此函数
  if (Object.keys(obj).length === 2) { // 用户根据结果自己觉得输出
    console.log(obj)
  }
});
