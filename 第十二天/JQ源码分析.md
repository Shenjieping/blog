## JQ 中核心的基础内容，JQ选择器

- 基于选择器。机票去到需要操作的DOM元素，获取到的是一个JQ对象
- 接下来可以调用JQ上提供的方法来实现操作
  - 样式操作 css/addClass/removeClass/toggleClass/hasClass...
  - 筛选：filter/children/find/sibling/prev/prevAll/nextAll...
  - DOM增删改：text/html/appent/val/appentTo/insterBerfore/remove...
  - 操作属性的：attr/removeAttr/prop...
  - 动画：stop/finish/animate/show/hide/toggle/faseIn...
  - 事件：on/bind/unbind/off/delgate...
- JQ中还提供了额外的方法
  - $.ajax()
  - $.each()
  - $.extend()
  - $.type()
- ...

```js
/* 
  typeof window !== "undefined" ? window : this
  判断浏览器是否存在winodw
 */
( function( global, factory ) {
  "use strict";
  if ( typeof module === "object" && typeof module.exports === "object" ) { // 此条件成立，说明是基于 commonjs 也即是node端

  } else {
    factory( global );
  }
})(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
  var jQuery = function( selector, context ) {
    return new jQuery.fn.init( selector, context );
  };

  jQuery.fn = jQuery.prototype = {
    constructor: jQuery // 重定向之后会丢失constructor
  }

  var init = jQuery.fn.init = function( selector, context, root ) {

  }

  jQuery.extend = jQuery.fn.extend = function() {}

  init.prototype = jQuery.fn;

  if ( typeof noGlobal === "undefined" ) {
    window.jQuery = window.$ = jQuery;
  }
})

/* 
  我们在导入JQ后，使用的$就是闭包中的jQuery
  $('.box'); 选择器执行其实就是让jQuery执行
    jQuery(seleator选择器, context获取当前元素的上下文)
    返回的结果是 jQuery.fn.init(init)这个类的实例，基于 __proto__ 找到 init.prototype。而 init.prototype 是jQuery.prototype 可以说创建的实例就是jQuery这个类的实例（俗称JQ对象）
    可以调用jQ原型上的方法
  JQ把方法放到了两个部分
    jQuery.prototype：$('xxx').xxx();
    jQuery：$.(xxx)
  项目中红尽可能把获取到的结果存起来。因为每一次执行都是创建一个全新的实例
 */
```

