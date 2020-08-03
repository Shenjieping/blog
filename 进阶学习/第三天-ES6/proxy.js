// 缺点是兼容性差（IE11以下兼容）

let obj = {
  name: 'shenjp',
  age: {
    a: 100
  }
};

/* 
如果设置失败会返回false，如果使用 Object.defineProperty 会直接报错
let obj1 = Object.freeze({a: 1});
let flag = Reflect.defineProperty(obj1, 'a', {
  value: 100
});
console.log(obj1, flag);
*/
let handler = {
  set(target, key, value) {
    // target[key] = value; // 更新原对象
    // // set是要求有返回值的 返回 boolean，告诉他是否成功
    // return true;
    if (key === 'length') { // 如果更新的是长度，就不更新视图
      return true;
    }
    update();
    return Reflect.set(target, key, value); // 使用这个更加语义化，如果失败就会返回false
  },
  get(target, key) {
    // 当取值的时候，如果还是个对象，就递归调用，将属性进行代理，返回代理后的结果
    if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], handler);
    }
    return Reflect.get(target, key);
  }
}

// let proxy = new Proxy(obj, handler);

function update() {
  console.log('update');
}


// proxy.age.a = 'hello';
// console.log(obj);

let arr = [1, 2, 3, 4];
let proxy = new Proxy(arr, handler);

proxy.push(5); // 调用push的时候，会把值放进去，再更改length