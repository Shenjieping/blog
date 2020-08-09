// 队列

class Queue {
  constructor() {
    this.arr = [];
  }
  enqueue(element) { // 入队列
    this.arr.push(element);
  }
  unqueue() { // 出队列
    return this.arr.shift()
  }
}
let queue = new Queue();
// 增删改查的方法

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
console.log(queue.arr);
console.log(queue.unqueue());
console.log(queue.arr);