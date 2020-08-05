// 箭头函数
// 没有this, 没有arguments 没有 prototype
let a = 100;
let obj = {
  a: 1,
  say: () => {
    console.log(this.a);
  }
}