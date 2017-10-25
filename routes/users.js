var express = require('express');
var router = express.Router();
var User = require('../model/User')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/register',(req,res) => {
  res.render('users/register');
})
router.post('/register',(req,res) => {
  // let username = req.body.username;
  // let  password= req.body.password;
  // 只要左右两边的结构一样  那么久直接赋值给他
  console.log(req);
  console.log(req.body);
  let {username,password}=req.body;
  User.findUserByUsername(username,(err,doc)=》{
    if(err){
      res.render('user/register'){
        code:1;
        msg:'查找用户异常'
      }
    }
  })
})
router.get('/login',(req,res) => {
  res.render('users/login')
})
module.exports = router;
