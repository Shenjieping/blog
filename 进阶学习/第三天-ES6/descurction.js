// 解构赋值 ... (剩余运算符，展开运算符)

let obj = {
  name: 'shenjp',
  age: 10
}

let {name, age} = obj;
console.log(name, age);

let {name: name1} = obj; // 重命名
console.log(name1);

let {name2 = 'haha'} = obj; // 赋默认值
console.log(name2);

// 数组的解构
let [n, o] = ['shenjp', 18];
console.log(n, o);

// 复杂的解构, 两边的解构要一致
let {school: { count }} = {school: {count: 100}};
console.log(count);

// 剩余运算符
let [a, ...args] = [1, 2, 3, 4];
console.log(a, args);

// 方法传递参数
function sum(...args) {
  console.log(args);
}
sum(1, 2, 3, 4, 5);

// 合并两个数组
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
console.log([...arr1, ...arr2]);

// 作业 mergeoptions

function mergeOptions(obj1, obj2) {
  for (let key in obj2) {
    if (obj1.hasOwnProperty(key) && typeof obj2[key] === 'object') {
      mergeOptions(obj1[key], obj2[key]);
    } else {
      obj1[key] = obj2[key];
    }
  }
  return obj1;
}

let obj1 = {
  a: 1,
  b: 2,
  c: {
    a: 1,
    b: {
      a: 1
    }
  }
};
let obj2 = {
  a: 2,
  c: {
    a: 2,
    b: {
      c: 2
    }
  },
  d: 3
}

console.log(mergeOptions(obj1, obj2)); // { a: 2, b: 2, c: { a: 2, b: { a: 1, c: 2 } }, d: 3 }


// 对象的展开，数组的展开，是浅拷贝

let arrslice = [1, 2, 3, [4]];
let newArrslice = arrslice.slice(3);
newArrslice[0][0] = 100;
console.log(arrslice); // [ 1, 2, 3, [ 100 ] ]