// map hash表
// 特点：查找快，可以直接通过所以查找

class Map {
  constructor() {
    this.arr = [];
  }
  calcKey(key) {
    let hash = 0;
    for(let k of key) {
      hash += k.charCodeAt(); // hash值的简单算法
    }
    return hash % 100; // 假设最多存100个
  }
  set(key, value) {
    let index = this.calcKey(key);
    this.arr[index] = value;
  }
  get(key) {
    let index = this.calcKey(key);
    return this.arr[index];
  }
}

let map = new Map();

map.set('hello', 'word');
map.set('word', 'hello');

console.log(map.get('hello'));