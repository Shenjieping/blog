// node 中使用 module.exports  require

/* 
  模块化的作用：
    方便维护，隔离作用域，防止命名冲突
 */

/* 
  commonjs 规范
    1. 每个文件都是一个模块
    2. 需要使用 module.exports 导出
    3. 别人使用就是 require
 */

/* 
  require 的核心是读取文件
  先读取文件 module.exports = 'hello';
  再给外面包一个自执行的函数
  (function(exports, require, module, __dirname, __filename) {
    module.exports = 'hello';
    return module.exports;
  })()
 */

const str = require('./module/a');
console.log(str);

/* 
  1. Module._load 加载某个模块
  2. Module._resolveFilename 解析文件名
  3. new Module 创建一个新的模块
  4. tryModuleLoad 尝试加载模块
 */