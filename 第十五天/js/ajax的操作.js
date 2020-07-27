// 1. 创建Ajax实例对象
let xhr = new XMLHttpRequest();
// 2. 打开url
xhr.open('get', './js/data.json', true)
// 3. 监听ajax的转态信息
xhr.onreadystatechange = function() {
  // xhr.readyState ajax状态 0-4
  // xhr.status xhr.statusText 服务器返回的网络状态码 2xx/3xx/4xx/5xx
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.response);
  }
}
// 4. 发送请求
xhr.send()