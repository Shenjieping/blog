function fun(num) {
  let res = [[]];
  for (let i = 0; i < num.length; i++) {
    let len = res.length;
    for (let j = 0; j < len; j++) {
      res.push(res[j].concat([num[i]]))
    }
  }
  return res;
}

var arr = [1, 2, 3, 4, 5]
console.log(fun(arr));