var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var settings = require('../settings');
var DB_URL = settings.DB_URL;
var app = express();
var db = require('../config/db')
// console.log(db);
app.set("view engine", "ejs");

/* GET home page. */


router.get('/tijiao', function(req, res,next) {

  var neirong = req.query.nr;
  //连接数据
  db._connectDB(function(err, db) {
    if (err) {

      res.send("网络连接失败，请重试")
      return;
    }


  //添加数据
  db.collection("wenti").insertOne({
    "neirong": neirong,
    "username": 'lsk',
    "data": new Date(),
    "huida":[],
  }, function(err, result) {
    if (err) {
      console.log("数据库写入失败");
      return;
    }
    // res.end();
    //关闭数据库
    db.close();
  });

})
db.find("wenti", {
  'username': 'lsk'
}, function(err, result) {
  if (result.length == 0) {
    console.log('数据库没有内容');;
  } else {
    var result = result;
  }
  console.log(result);
  res.render('index', {
    'c': "9",
    "msg": '请输入发布内容',
    "result": result,
  });
res.end();
});


})
router.get('/', function(req, res, next) {
  // var username=req.query.uesrname;
  db._connectDB(function(err, db) {
    if (err) {

      res.send("网络连接失败，请重试")
      return;
    }
  })
  // console.log(req);
  db.find("wenti", {
    'username': 'lsk'
  }, function(err, result) {
    if (result.length == 0) {
      console.log('数据库没有内容');;
    } else {
      var result = result;
    }
    console.log(result);
    res.render('index', {
      'c': "9",
      "msg": '请输入发布内容',
      "result": result,
    });

  });


});
module.exports = router;
