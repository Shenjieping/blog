// set 集合
// 特点不重复

class Set {
  constructor() {
    this.obj = {};
  }
  hasOwn(element) {
    return this.obj.hasOwnProperty(element);
  }
  set(element) {
    if (!this.hasOwn(element)) {
      this.obj[element] = element;
    }
  }
}
let set = new Set();
set.set(1);
set.set(1);
set.set(3);

console.log(set);