// 【1，1，3，4，5，4，5】
function remove(array) {
  if (typeof array === 'object') {
    // 处理去重
    for (let i = 0; i < array.length; i++) {
      for (let j = 1; j < array.length - 1; j++) {
        if (array[j] === array[i] && i !== j) {
          array.splice(j, 1)
        }
      }
    }
    return array
  }
}

function remove2(array) {
  if (typeof array === 'object') {
    let myset = new Set(array)
    return [...myset]
  }
}
// Array.from(new Set(array))

function remove3(array) {
  if (typeof array === 'object') {
    var temp = [];
    for (let i = 0; i < array.length; i++) {
      // console.log(array.indexOf(array[i]));
      // console.log(array.lastIndexOf(array[i]));
      if (array.indexOf(array[i]) === i) {
        temp.push(array[i])
      }
    }
    return temp;
  }
}

function remove4(array) {
  if (Array.isArray(array)) {
    var temp = [];
    array.map(item => {
      if (temp.includes(item) == false) {
        temp.push(item);
      }
    })
    return temp;
  }
}

// 数组去重reduce 可适用于对象数组根据某一项去重
function remove5(array) {
  let repeat = {}; // 生成map，记录重复次数
  // reduce有两个参数，第一个是回调函数主要用来处理数组，第二个参数是初始值，是赋值给回调函数的第一个参数的值（可以是数组，数字等，一般与最后的结果类型一致）
  let result = array.reduce((accumulator, item) => {
    console.log(repeat, 'repeat')
    if (repeat[item.id]) {
      repeat[item.id]++;
      return accumulator;
    }
    repeat[item.id] = 1;
    return [...accumulator, item]
  }, [])
  console.log(result, 'result')
  return result;
}

// let arr = [1,1,3,4,5,4,5];
let arr = [undefined, 1, 2, 2, undefined, null, null];
let obj = { name: '111' };
let objArr = [
  { id: 1, name: 'qwwe' },
  { id: 2, name: 'rt' },
  { id: 1, name: 'qwwe' },
  { id: 3, name: '234' },
  { id: 3, name: 'ipk' }
]
let result = remove5(objArr);
console.log(result)


let strarr = ['123/4/5', '123/4/7', '123/5/1', '123/6/5/4', '234/5/6/9'];
// function longestCommonPrefix(strs) {
//   var re = '';
//   if (!strs.length) return re;
//   for (var j=0;j<strs[0].length;j++){//第j位
//       for (var i=1;i<strs.length;i++){//第i个
//           if (strs[i][j]!=strs[0][j]) return re
//       }
//       re += strs[0][j];
//   }
//   return re;
// };
function longestCommonPrefix(strs) {
  let tempStr = strs[0];
  while (strs.some(item => item.indexOf(tempStr) !== 0)) {
    tempStr = tempStr.substring(0, tempStr.length - 1);
  }
  return tempStr;
};
let str = longestCommonPrefix(strarr);
console.log(str, 'str')