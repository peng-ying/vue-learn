// api/demo.js

var dataDemo = {
  'code':'000',
  'message':'message消息',
  'lists':[
    {
      'name': '小王',
      'age': '18',
      'role': 'admin',
      'id': 1
    },
  ]
}

var dataDemo2 = {
  'code':'000',
  'message':'message消息',
  'lists':[
    {
      'name': '小张',
      'age': '14',
      'role': 'client1',
      'id': 2
    },
  ]
}

exports.getData = function(method,data){
  var backData;
  if(data.name === 'admin') {
    backData={
        "code":'200',
        "msg":"",
        "data":dataDemo
    }
  } else {
    backData={
      "code":'200',
      "msg":"",
      "data":dataDemo2
  }
  }
  if(method=='DELETE'){
      backData={
          "code":'999',
          "msg":"不支持DELETE方法"
      }
  }
  return JSON.stringify(backData);
}