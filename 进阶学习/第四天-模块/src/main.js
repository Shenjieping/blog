// 模块
// 按功能划分结果，保证命名不冲突，方便维护
// 主流：ESModule es6模块, commonjs规范， umd 统一规范，打包都能用

// ESModule （import export） 静态模块
// commonjs规范 （require module.exports） 动态模块

// 通过export default 导出的是一个具体的值，export 导出的是一个变量
console.log(def); // 存在变量提升。可以在导入之前使用
import def, * as obj from './a';

console.log(obj, def);

// def = 123; // 不能修改导入的变量的值