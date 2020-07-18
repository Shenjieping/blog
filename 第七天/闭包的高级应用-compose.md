## compose函数

```js
/* 
  在函数式变成中有一个很重要的概念就是组合函数，实际上就是把处理的函数像管道一样链接起来，然后让数据穿过广告得到最终的结果，例如：
 */
const add1 = (x) => x + 1;
const mul3 = (x) => x * 3;
const div2 = (x) => x / 2;
div2(mul3(add1(add1(0)))) // 3

/* 
  这种写法的可读性太差了，我们可以构建一个compose 函数，它接受任意多个函数作为参数（这些函数都只接受一个参数），然后compose 返回的也是一个函数，达到如下效果：
 */
const operate = compose(div2, mule3, add1, add1);
operate(0); // => 相当于 div(mul3(add1(add1(0))))
operate(2);// => 相当于 div(mul3(add1(add1(2))))

/* 
  简单说，就是 compose 可以把类似于 f(g(h(x))) 这种写法简化成 compose(f, g, h)(x);
 */
```

```js
const add1 = (x) => x + 1;
const mul3 = (x) => x * 3;
const div2 = (x) => x / 2;

function compose(...funcs) {
  return function anonymous(val) {
    // val是第一个函数执行的实参
    let len = funcs.length;
    if (len === 0) {
      return val;
    }
    if (len === 1) {
      return funcs[0](val);
    }
    return funcs.reverse().reduce((N, item) => { // 或者 reduceRight
      // return typeof N === 'function' ? item(N(val)) : item(N);
      return item(N);
    }, val)
  }
}

const operate = compose(div2, mul3, add1, add1);
console.log(operate(0));
```

```js
// redux compose
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
```

```js
// 递归调用的方式
function compose(...funcs) {
  function inner(...args) {
    let total = funcs.pop()(...args);
    return funcs.length > 0 ? inner(total) : total;
  }
  return funcs.length === 0 ? arg => arg : inner;
}
```