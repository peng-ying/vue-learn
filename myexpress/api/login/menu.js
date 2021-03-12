// api/menu.js

var menu = {
  'code':'000',
  'message':'message消息',
  'lists':[
    {
      'name': '审核备案', 
      'path': '/apply', 
      'id': 1,
      'parentid': -1,
      'children': [
        {
          'name': '项目审核', 
          'path': '/apply/index', 
          'id': 100,
          'parentid': 1,
        },
        {
          'name': '合同审核', 
          'path': '/apply/contract', 
          'id': 101,
          'parentid': 1,
        },
      ]
    },
    {
      'name': '案件管理', 
      'path': '/proManage',
      'id': 2,
      'parentid': -1,
      'children': [
        {
          'name': '村级案件', 
          'path': '/proManage/index', 
          'id': 200,
          'parentid': 2,
        },
        {
          'name': '乡级案件', 
          'path': '/apply/country', 
          'id': 201,
          'parentid': 2,
        },
      ]
    },
    {
      'name': '发布信息', 
      'path': '/report',
      'id': 3,
      'parentid': -1,
      'children': [
        {
          'name': '招聘信息', 
          'path': '/report/index', 
          'id': 300,
          'parentid': 3,
        },
      ]
    },
    {
      'name': '系统配置', 
      'path': '/system',
      'id': 3,
      'parentid': -1,
      'children': [
        {
          'name': '用户信息', 
          'path': '/system/index', 
          'id': 400,
          'parentid': 4,
        },
      ]
    },
  ]
}

var menu2 = {
  'code':'000',
  'message':'message消息',
  'lists':[
    {
      'name': '发布信息', 
      'path': '/report',
      'id': 3,
      'parentid': -1,
      'children': [
        {
          'name': '招聘信息', 
          'path': '/report/index', 
          'id': 300,
          'parentid': 3,
        },
      ]
    },
  ]
}

exports.getData = function(method,data){
  var backData;
  if(data.role === 'admin') {
    backData={
        "code":'200',
        "msg":"",
        "data":menu
    }
  } else {
    backData={
      "code":'200',
      "msg":"",
      "data":menu2
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