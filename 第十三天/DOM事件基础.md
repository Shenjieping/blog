## DOM基础知识

- 什么是事件，什么是事件绑定?
- 浏览器自带的事件

经典面试题：

window.onload 和 document.ready (JQ.$(document).ready())的区别？

  1. load 是等待所有资源都加载完成，才会触发执行，而我之前研究过部分JQ的源码 $(document).ready() 是用的 DOMContentLoaded 时间时间本身是DOM结构加载完成就会触发执行，所以他要优先于window.onload触发
  2. window.onload 是基于DOM0级绑定，整个页面只能绑定一次，所以页面只能用一次，而JQ中是基于 DOM2级完成的，所以在一个页面中可以绑定多个不同的方法，也就是多次使用，我之前在JQ开发中，经常把编写的代码放在 $(function() {}),既能形参闭包，又可以等DOM结构加载完才会执行
  3. 不论哪一种办法都是保证dom结构加载完才会执行，这样在方法中肯定能获取到元素，防止把js放在DOM之前加载。（引申问题：JS/CSS/IMG 结构加载的顺序和机制，浏览器渲染机制）