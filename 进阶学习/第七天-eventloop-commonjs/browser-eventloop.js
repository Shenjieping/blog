// 浏览器执行的时候，会将到达事件的定时器 ajax 存放到回调中，当执行栈执行后，会从队列中取出第一个宏任务来执行

setTimeout(() => {
  console.log('time1');
  setTimeout(() => {
    console.log('time4');
  }, 0);
}, 0);

setTimeout(() => {
  console.log('time2');
}, 0);

setTimeout(() => {
  console.log('time3');
}, 0);