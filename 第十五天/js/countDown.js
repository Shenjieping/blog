/* 
  拿当前时间和目标时间对比，计算出差值
    new Date() 获取的是客户端本地的时间（这个时间客户可以改）
    倒计时抢购的当前时间以服务器时间为准（服务器返回的响应头信息中有服务器时间）

  思路：加载页面先从服务器获取时间（尽可能减少时间差），使用HEAD请求更快，把获取的时间存起来，以后每隔一秒让获取的时间累加
 */

let target = new Date('2020/7/28 07:31:00'),
    now = new Date(),
    timer = null;
let spanBox = document.getElementById('spanBox');

function queryServerTime() {
  let xhr = new XMLHttpRequest();
  xhr.open('HEAD', './js/data.json?_=' + now);
  xhr.onreadystatechange = function() {
    if (xhr.status >= 200 && xhr.status < 400) {
      if (xhr.readyState === 2) {
        // 把服务器获取到的格林尼治时间 GMT 转为北京时间 GMT+0800
        now = new Date(xhr.getResponseHeader('date'));
        computed(); // 计算时间差
        // 每隔一秒让时间累加
        interval();
      }
    }
  }
  xhr.send();
}

function computed () {
  let spanTime = target - now;
  if (spanTime <= 0) {
    spanBox.innerHTML = '00:00:00';
    clearTimeout(timer);
    timer = null;
    return;
  }
  let hours = Math.floor(spanTime / (60 * 60 * 1000));
  spanTime = spanTime - (60 * 60 * 1000) * hours;
  let minutes = Math.floor(spanTime / (60 * 1000));
  spanTime = spanTime - (60 * 1000) * minutes;
  let seconds = Math.floor(spanTime / 1000);
  spanBox.innerHTML = `${zero(hours)}:${zero(minutes)}:${zero(seconds)}`;
}

function zero (num) {
  return num < 10 ? ('0' + num) : num;
}

function interval () {
  timer = setTimeout(() => {
    // 在自身的基础上加1秒
    now = new Date(now.getTime() + 1000);
    computed();
    if (timer) {
      interval();
    }
  }, 1000);
}

queryServerTime();