var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var settings=require('../settings');
var DB_URL=settings.DB_URL;
var app = express();
var db=require("../config/db.js")
var md5=require("../config/md5.js")
app.set("view engine","ejs");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('./users/register', { title: 'Express' });
  res.end();
});
router.post('/register',function (req,res) {
    // console.log(req.query);
let {username,password}=req.body;
//console.log(password)
  MongoClient.connect(DB_URL, function(err, result) {
      if(err){
          // console.log("数据库连接失败");
          res.send("网络连接失败，请重试")
          return;
      }
   db.find("user", {"username": username}, function (err, result) {
   	        if (err) {
                res.send("-3"); //服务器错误
                return;
            }
            if (result.length !=0) {
                res.send("用户名已经被注册过"); //被占用
                return;
            }
            //没有相同的人，就可以执行接下来的代码了：
            //设置md5加密
            password = md5(md5(password));
//console.log("hahahhaha")
            //现在可以证明，用户名没有被占用
            db.insertOne("user", {
                "username": username,
                "password": password,
                "avatar": "../images/1.jpg"
            }, function (err, result) {
            	console.log(result)
                if (err) {
                    res.send("-3"); //服务器错误
                    return;
                }
            });
            res.send("success!"); //注册成功，写入session
  });
  });  
})
router.get('/login', function(req, res, next) {
  res.render('./users/login', { title: 'Express' });
  res.end();
});
router.post('/login',function (req,res) {
    // console.log(req.query);
let {username,password}=req.body;
//console.log(password)
  MongoClient.connect(DB_URL, function(err, result) {
      if(err){
          // console.log("数据库连接失败");
          res.send("网络连接失败，请重试")
          return;
      };
   db.find("user", {"username": username}, function (err, result) {
   	var obj=result[0];
   	        if (err) {
                res.send("-3"); //服务器错误
                return;
            }
            if (result.length=0) {
                res.send("用户名没有被注册过"); //被占用
                return;
            }
            //没有相同的人，就可以执行接下来的代码了：
            //设置md5加密
            if(result.length=1){
            	password = md5(md5(password));
            	if(obj.password==password){
            		res.send("登录成功！")
            	}else{
            		res.send("密码错误！")
            	}
            }; 
  });  
});
 });
 router.get('/details', function(req, res) {
  res.render('./users/details', { title: 'Express' });
  res.end();
});
module.exports = router;
router.post('/details',function (req,res) {
    // console.log(req.query);
let {username,wenti}=req.body;
//console.log(password)
MongoClient.connect(DB_URL, function(err, result) {
      if(err){
          // console.log("数据库连接失败");
          res.send("网络连接失败，请重试")
          return;
      }
   db.find("tiwen", {"wenti": wenti}, function (err, result) {
   	        if (err) {
                res.send("-3"); //服务器错误
                return;
            }
            if (result.length !=0) {
                res.send("用户名已经被注册过"); //被占用
                return;
            }
            //没有相同的人，就可以执行接下来的代码了：
            //设置md5加密
//          db.insertOne("user", {
//              "username": username,
//              "password": password,
//              "avatar": "../images/1.jpg"
//          }, function (err, result) {
//          	console.log(result)
//              if (err) {
//                  res.send("-3"); //服务器错误
//                  return;
//              }
//          });
            res.send("success!"); //注册成功，写入session
});
});  
})
