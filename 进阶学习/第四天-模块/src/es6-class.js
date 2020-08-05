class Animal {
  constructor() {
    this.name = 'shenjp';
  }
  say() {

  }
  static a = 1;
  static get age() { // 实例上的方法
    return '18';
  }
  get pop() { // 原型上的属性
    return 'hhhh';
  }
}

console.log(Animal.age);