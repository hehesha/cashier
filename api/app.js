var express = require('express');
var app = express();
//链接数据库模块
var mysql = require("mysql");
//form表单需要的中间件。
var mutipart= require('connect-multiparty');
var mutipartMiddeware = mutipart();

//下面会修改临时文件的储存位置，如过没有会默认储存别的地方。
app.use(mutipart({uploadDir:'./config'}));

//浏览器访问localhost会输出一个html文件
app.get('/',function (req,res) {
    res.type('text/html');
    res.sendfile('public/index.html')

});




//连接服务器配置.......................................................................
function createConnection() {
    var connection = mysql.createConnection({
        host: 'localhost',// 127.0.0.1 10.3.136.153
        user: 'root',
        password: '',
        database: 'cashier',
        multipleStatements: true
    });
    return connection
}
//解决跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    next();
});


app.use(express.static('config'));
// parse application/json 

//get请求.................................................................................
app.get('/login', function(req, res) {
    //然后请求的很快的时候才能正常关闭链接、
    var connection = createConnection();
    connection.connect();
    //引入查找模块
    require('./router/user').login(req,res,connection);
    console.log(req.query)
})

//要post请求...............................................................................
// parse application/x-www-form-urlencoded 
//使用bodyParser模块
//用于post请求获取参数
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}))

app.post('/register', function(req, res) {
    //然后请求的很快的时候才能正常关闭链接、
    var connection = createConnection();
    connection.connect();
    //引入查找模块
    require('./router/user').register(req,res,connection);
})
app.post('/addgoods', function(req, res) {
    //然后请求的很快的时候才能正常关闭链接、
    var connection = createConnection();
    connection.connect();
    //引入查找模块
    require('./router/goods').addgoods(req,res,connection);
})

//监听该端口..............................................................................
var server = app.listen(3000, function() {
    //测试
    //测试
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})