const path = require('path');
const fs = require('fs');
const vm = require('vm'); // node 的内部模块，用于解析并执行JS字符串

function Module(id) {
  this.id = id; // 当前模块的id名
  this.exports = {}; // 默认是空对象，导出的结果
}
// 定义存放后缀名的对象
Module.extensions = {};
// 如果文件是js，后期使用这个函数去处理
Module.extensions['.js'] = function(module) {
  // 1. 读取
  let script = fs.readFileSync(module.id, 'utf8');
  // 2. 添加函数，是一个字符串
  let content = wapper[0] + script + wapper[1];
  // 3. 让这个字符串函数执行 (node API)
  let fn = vm.runInThisContext(content); // 这里就会返回一个js函数
  let __dirname = path.dirname(module.id); // 取文件的父路径
  // 让函数执行
  fn.call(module.exports, module.exports, req, module, __dirname, module.id);
}
// 如果文件是json
Module.extensions['.json'] = function(module) {
  let script = fs.readFileSync(module.id, 'utf8');
  module.exports = JSON.parse(script);
}

// 获取绝对路径
Module._resolveFilename = function(id) {
  // 将相对路径转为绝对路径
  let absPath = path.resolve(__dirname, id);
  // 尝试添加文件后缀 .js .json .node
  let extensions = Object.keys(Module.extensions);
  for (let i = 0; i < extensions.length; i++) {
    let ext = extensions[i];
    // 获取当前路径
    let currentPath = absPath + ext
    // 判断路径是否存在
    let exits = fs.existsSync(currentPath);
    if (exits) {
      return currentPath;
    }
  }
  throw new TypeError('文件不存在')
}

let wapper = [
  '(function(exports, require, module, __dirname, __filename) {',
  '})'
];
/* 
module 和 exports 是一个东西
 */

// 尝试加载某个模块
function tryModuleLoad(module) {
  // 获取到扩展名，调用对应的方法
  const ext = path.extname(module.id);
  Module.extensions[ext](module);

}

// 缓存
Module._cache = {}

function req(id, ) { // 没有异步的API
  // 通过相对路径获取绝对路径
  let filename = Module._resolveFilename(id);
  // 获取缓存
  let cache = Module._cache[filename];
  if (cache) {
    // 如果有缓存，直接将模块的结果返回
    return cache.exports;
  }
  let module = new Module(filename); // 创建了一个模块
  Module._cache[filename] = module;
  // 加载相关模块（就是给这个模块的exports赋值）
  tryModuleLoad(module);
  // 返回当前模块
  return module.exports;
}

let str = req('./a');
let str2 = req('./a');
console.log(str);