class Animal {
  constructor(name) {
    this.name = name;
    // 类的实例化检测
    if (new.target === Animal) { // 说明new的是自己
      throw new Error('not new');
    }
  }
  say() {
    console.log('say');
  }
}
// extends = apply + Object.create + __proto__
class Tiger extends Animal {
  // 如果子类没有写constructor，会自动将参数传给父类

  constructor(name) {
    super(name); // 调用父类的方法，这里的super指的就是父类
  }
  say() {
    super.say(); // super 指父类的 prototype
  }
  static a() { // 静态方法中的super指向父类
    return super.a();
  }
}

let tiger = new Tiger('老虎');
console.log(tiger.name, tiger.say());


// 抽象类：可以被继承，但是不能被new