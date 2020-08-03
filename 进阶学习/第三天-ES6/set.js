// set 代表的是集合， map 代表 hash表
// 集合就是不能有重复的项，数组去重 new Set()

let set = new Set([1, 1, 2, 3, 4, 4, 4]); // 他的key 和值是一样的
console.log(set);
// 数据结构的增删改查
console.log(set.entries());

// Object.keys() Object.value() Object.entries();
let obj = {
  a: 1,
  b: 2,
  [Symbol()]: 100
};
console.log(Object.keys(obj)); // 无法取到Symbol
console.log(Object.getOwnPropertySymbols(obj)); // 只能取Symbol
// 以后所有的 Object.xxx 都会变成 Reflect.xxx
console.log(Reflect.ownKeys(obj)); // [ 'a', 'b', Symbol() ]


// 如何求两个数组的 并集，差集，交集

let arr1 = [1, 2, 3];
let arr2 = [3, 4, 5];

// 并集
let union = [...new Set([...arr1, ...arr2])];
console.log(union);

// 交集
// let s1 = new Set(arr1);
// let s2 = new Set(arr2);
// let intersection = [...s1].filter(value => {
//   return s2.has(value);
// });
// console.log(intersection)

// 差集
let s1 = new Set(arr1);
let s2 = new Set(arr2);
let def = [...s1].filter(value => {
  return !s2.has(value);
});
console.log(def)