// node 能干什么？
// 可以写一些工具库
// node 中间层，基于JavaScript，运行时 runtime ，node只包含了 ECMAScript + 内置的模块，创建高性能的web服务
// 缺陷：安全和稳定性，只适合做 I/O密集型的，比如文件读写

// node 单线程（I/O密集型）异步非阻塞I/O 事件驱动，可以实现高并发（同一时间内多个请求）

// 多线程的好处：可以再同一时间内处理多个请求，通过时间片切换

// node 适合 web服务器，调取接口，访问文件的这种 I/O惨景，如果复杂的情况下，可能会导致阻塞，node 可以开启子进行

/* 
  多线程：同步 阻塞
  单线程：异步 非阻塞
 */

/*
const cpus = require('os').cpus().length; // 获取cup的核数
console.log(cpus);
*/