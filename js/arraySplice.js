// 【1，1，3，4，5，4，5】
function remove(array) {
  if(typeof array === 'object') {
    // 处理去重
    for(let i=0;i<array.length;i++) {
      for(let j=1;j<array.length - 1;j ++) {
        if(array[j] === array[i] && i !== j) {
          array.splice(j,1)
        }
      }
    }
    return array
  }
}

function remove2(array) {
  if(typeof array === 'object') {
    let myset = new Set(array)
    return [...myset]
  }
}
// Array.from(new Set(array))

function remove3(array) {
  if(typeof array === 'object') {
    var temp = [];
    for(let i=0;i<array.length;i++) {
      // console.log(array.indexOf(array[i]));
      // console.log(array.lastIndexOf(array[i]));
      if(array.indexOf(array[i]) ===  i) {
        temp.push(array[i])
      }
    }
    return temp;
  }
}

function remove4(array) {
  if(Array.isArray(array)) {
    var temp = [];
    array.map(item => {
      if(temp.includes(item) == false) {
        temp.push(item);
      }
    })
    return temp;
  }
}

// let arr = [1,1,3,4,5,4,5];
let arr = [undefined, 1, 2, 2, undefined, null, null];
let obj = {name: '111'};
let result = remove(obj);
console.log(result)