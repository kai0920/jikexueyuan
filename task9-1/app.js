var express = require('express');
var routes = require('./routes');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();


app.set("view engine","ejs");//设置模板引擎
app.set('views', __dirname + '/views');//设置模板路劲
app.use(express.static(path.join(__dirname,'public')));//指定静态网页目录
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


routes(app);//执行路由


app.listen(3000,function(){
	console.log('Example app listening on port 3000!');
});