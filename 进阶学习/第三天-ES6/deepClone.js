// 深拷贝

let obj = {
  name: 'shenjp',
  age: {
    a: 18,
    b: 19
  }
};

// 最简单的拷贝，使用JSON.stringfy 和JSON.parse
// JSON 只能拷贝基本的值。不支持函数，正则，日期，undefined
// let newObj = JSON.parse(JSON.stringify(obj));
// console.log(newObj === obj); //false

// 递归拷贝对象（函数一般不拷贝）
function deepClone(obj, hash = new WeakMap()) {
  if (obj == null || typeof obj !== 'object') { // 如果是null 或者undefined直接返回
    // 基本数据类型：string, number, boolean, symbol,bigInt
    return obj;
  }
  // 正则，日期的typeof也是 object
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (hash.get(obj)) { // 如果映射表中存在，直接将结果返回
    return obj;
  }
  // obj 可能是 [] 或者 {}
  let cloneObj = new obj.constructor;
  hash.set(obj, cloneObj); // 如果不存在就创建映射
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) { // 只拷贝实例上的属性
      // 可能当前项还是一个应用类型
      // 这里要防止循环引用导致的死循环
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}

// let newObj = deepClone(obj);
// newObj.age.a = 100;
// console.log(newObj);

let obj1 = {a: 1};
obj1.b = obj1; // 循环引用问题


