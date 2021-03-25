var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*引入api*/
var api = require('./config/api');

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

//配置请求
app.get('/', function(req, res){
  res.send('hello world');
});
app.get('/api/*', api.get);
app.post('/api/*', api.post);
app.options('/api/*', function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.sendStatus(200);/*让options请求快速返回*/
});


module.exports = app;



// app.js 应用初始化文件，包括引入所有应用的依赖项、设置视图模板引擎、静态资源路径、引入路由、配置中间件等
// bin/www 启动文件，设置监听端口、启动http服务等
// public 静态文件目录
// routes 路由文件，响应用户的http请求并返回结果
// views 视图文件