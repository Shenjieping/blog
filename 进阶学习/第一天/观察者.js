let fs = require('fs');

// 观察者模式，观察者，和被观察者，是有关联的。观察者需要吧自己放到观察者之上，当被观察者转态发送变化，需要通知所有的观察者
class Subject { // 被观察者
  constructor(name) {
    this.name = name;
    this.state = '开心';
    this.observers = [];
  }
  setState (state) {
    this.state = state; // 更新被观察者的状态
    this.observers.forEach(fn => fn.update(this))
  }
  attach(o) { // 需要将注册者放到自己身上
    this.observers.push(o);
  }
}
class Observer { // 观察者
  constructor(name) {
    this.name = name;
  }
  update (s) { // 等会被观察者的状态发送变化会调用这个方法
    console.log(this.name, '说:', s.state);
  }
}

let baby = new Subject('小宝宝');
let parent = new Observer('爸爸');
let mothor = new Observer('妈妈');

baby.attach(parent);
baby.attach(mothor);
baby.setState('不开心');

setTimeout(() => {
  baby.setState('开心了');
}, 1000);



/* // 异步的解决方案，最早是基于回调函数的
fs.readFile('./age.txt', 'utf8', function(error, data) {
  // console.log(error, data);
  e.emit('age', data)
});

fs.readFile('./name.txt', 'utf8', function(error, data) {
  // console.log(data);
  e.emit('name', data)
});

// 订阅好一件事，当事件发生的时候，触发对应的函数

// 订阅 => on   发布 => emit
e.on(function(obj) { // 每次发布都会触发此函数
  if (Object.keys(obj).length === 2) { // 用户根据结果自己觉得输出
    console.log(obj)
  }
});
 */