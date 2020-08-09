// 二叉树  二叉搜索树
// 遍历树  广度  深度

/* 
  规则：先创建根节点，下一个数和根节点比较，大的放右边，小的放左边
  100 200 30 80 70

          100
       30    200
         80
       70
 */
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }
  insertTree(currentNode, newNode) {
    if (newNode.value < currentNode.value) {
      if (currentNode.left == null) {
        currentNode.left = newNode;
      } else {
        this.insertTree(currentNode.left, newNode);
      }
    } else {
      if (currentNode.right == null) {
        currentNode.right = newNode;
      } else {
        this.insertTree(currentNode.right, newNode);
      }
    }
  }
  set(val) {
    let node = new Node(val);
    if (!this.root) {
      this.root = node;
    } else {
      this.insertTree(this.root, node);
    }
  }
}

// let tree = new Tree();
// tree.set(100);
// tree.set(200);
// tree.set(30);
// tree.set(80);
// tree.set(70);
// console.log(tree); 
/* 
  {
    "root": {
      "value":100,
      "left": {
        "value": 30,
        "left":null,
        "right":{
          "value":80,
          "left":{
            "value":70,
            "left":null,
            "right":null
          },
          "right":null
        }
      },
      "right":{
        "value":200,
        "left":null,
        "right":null
      }
    }
  }
 */
