// 这个文件需要整合 x, y 文件，统一导出
/* 
import {x} from './x';
import {y} from './y';

export {
  x,
  y
}
*/

// 简化形式，导入立刻导出
export * from './x'; // 导入导出 x 下的所有变量
export { y } from './y'; // 只导入导出 y 下的 y变量（导出部分类容）

// console.log(y); // 这里无法打印。报错