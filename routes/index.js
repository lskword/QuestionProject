var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var settings=require('../settings');
var DB_URL=settings.DB_URL;
var app = express();

app.set("view engine","ejs");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tijiao',function (req,res) {
    // console.log(req.query);
  var neirong =req.query.nr;

  MongoClient.connect(DB_URL, function(err, db) {
      if(err){
          // console.log("数据库连接失败");
          res.send("网络连接失败，请重试")
          return;
      }

      db.collection("wenti").insertOne({
          "neirong":neirong,
          "用户名":'lsk',
      },function(err,result){
          if(err){
              console.log("数据库写入失败");
              return;
          }
          res.render('index',{"code":'8','msg':'发布成功'});
          res.end();
          //关闭数据库
          db.close();
      });
  });
})
module.exports = router;
