var express = require('express');
var router = express.Router();

const userInfo = {
  'code': '200',
  'message':'获取用户信息成功',
  'data': [
    {
      'name': '小王',
      'age': '18',
      'role': 'admin',
      // 'menus': [
      //   {'name': '审核备案', 'path': '/apply'},
      //   {'name': '案件管理', 'path': '/proManage'},
      //   {'name': '发布信息', 'path': '/report'},
      //   {'name': '系统配置', 'path': '/system'},
      // ]
    },
    {
      'name': '小张',
      'age': '14',
      'role': 'client1',
      // 'menus': [
      //   {'name': '发布信息', 'path': '/report'},
      // ]
    },
  ]
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(userInfo);
});

module.exports = router;


// 修改了东西，但是刷新浏览器没有实时更新数据
// 原因是被缓存了