// reduce 收敛，把一个数组转换成一个值

let arr = [1, 2, 3, 4, 5];
// 如果不传第二个参数，数组不能为空，否则会报错
let res = arr.reduce((prev, next) => {
  return prev + next;
});
// console.log(res);

let res1 = [
  {
    count: 3,
    price: 5
  },
  {
    count: 3,
    price: 5
  },
  {
    count: 3,
    price: 5
  }
].reduce((prev, next) => {
  return prev + (next.count * next.price)
}, 0); // 指定reduce的第一项初始值
console.log(res1);

// 作业, 将下面的数字扁平化
let arr2 = [1, [2, [3, [4, 5]]]];
function flat2 (arr) {
  return arr.reduce((prve, next) => {
    return prve.concat(Array.isArray(next) ? flat2(next) : next);
  }, []);
}


function flat(arr, res = []) {
  arr.forEach(item => {
    if (Array.isArray(item)) {
      flat(item, res);
    } else {
      res.push(item);
    }
  });
  return res;
}
let res2 = flat2(arr2);
// console.log('......', res2);


// compose 组合函数，把多个函数组合在一起
function sum(a, b) {
  return a + b;
}
function len(str) {
  return str.length;
}
function addCurrency(str) {
  return '$' + str;
}

// let res = addCurrency(len(sum('shen', 'jp')));
// console.log(res);

/* function compose(...fns) {
  return function(...args) {
    let lastFnRes = fns.pop();
    return fns.reduceRight((prev, next) => {
      return next(prev);
    }, lastFnRes(...args));
  }
} */

// 正序执行 redux 中的redux
/* function compose(...fns) {
  return fns.reduce((prev, next) => {
    return function (...args) {
      return prev(next(...args));
    }
  })
} */
// 简化
let compose = (...fns) => fns.reduce((a, b) => (...args) => a(b(...args)));

let res = compose(addCurrency, len, sum)('shen', 'jp');
console.log(res);

// 实现一个reduce方法
