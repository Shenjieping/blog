// 链表

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkList {
  constructor() {
    this.head = null; // 头指针
    this.length = 0; // 链表的长度
  }
  // 新增
  append(element) {
    let node = new Node(element);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) { // 不停的找next
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }
  // 插入
  insert(position, element) {
    checkPosition(position, this.length);
    let node = new Node(element);
    if (position === 0) {
      let oldNode = this.head;
      this.head = node;
      node.next = oldNode;
    } else {
      let current = this.head;
      let previous = null;
      let index = 0;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      previous.next = node;
      node.next = current;
    }
    this.length++;
  }
  // 删除
  del(position) {
    checkPosition(position, this.length);
    if (position === 0) {
      let oldNode = this.head;
      this.head = oldNode.next;
    } else {
      let current = this.head;
      let previous = null;
      let index = 0;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    this.length--;
  }
  // 修改
  modifiy(position, element) {
    checkPosition(position, this.length);
    let current = this.head;
    let index = 0;
    while (index++ < position) {
      current = current.next;
    }
    current.element = element;
  }
}
function checkPosition(position, length) {
  if (typeof position !== 'number') {
    throw new Error('position is not a number');
  }
  if (position < 0 || position >= length) {
    throw new Error('position out of limit');
  }
}
// 方便对链表中的元素进行操作
let linkList = new LinkList();
linkList.append(1);
linkList.append(2);
linkList.append(3);
linkList.insert(1, 'hello');
linkList.del(0)
linkList.modifiy(0, 'word');

console.log(linkList);

/* 
  element      element        element
  next ----->  next --------> next

  上一个数据的next指向下一个数据的next
 */