// 栈

class Stack {
  constructor() {
    this.arr = [];
  }
  push(element) { // 入栈
    this.arr.push(element);
  }
  pop() { // 出栈
    return this.arr.pop()
  }
}
let stack = new Stack();
// 增删改查的方法

queue.stack(1);
queue.stack(2);
queue.stack(3);
queue.stack(4);
console.log(queue.arr);
console.log(queue.pop());
console.log(queue.arr);