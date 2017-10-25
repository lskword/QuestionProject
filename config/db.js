let mongoose = require('mongoose');
var db=mongoose.createConnection('mongodb://127.0.0.1:27017/questionproject')
db.on('open',cb=>{
  console.log('数据连接成功');
})
db.on('error',cb=>{
  console.log('数据连接失败');
})
module.exports=db;
