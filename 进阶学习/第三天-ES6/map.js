// map 也叫hash表 或者散列

// key 不能重复,key 可以是对象
let map = new Map();
map.set('a', '123');
map.set('b', '456');
map.set('c', 123);
map.set({a: 1}, 123);
map.set({a: 1}, 456);
console.log(map);
console.log(map.get('b'));

// map   WeakMap(key 只能是对象)

function MyFn() {}
let fn = new MyFn();
let map = new Map();
map.set(fn, '123')
fn = null; // 这样 MyFn 不能被销毁
