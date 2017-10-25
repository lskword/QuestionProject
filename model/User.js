var mongoose = require('mongoose')
var db = require('../config/db')
let UserSchema = new mongoose.Schema({
  username:{type:String};
  password:{type:String};
  sex:{type:String};
  avatar:{type:String};
  lat_login_at:{type:String};
});
UserSchema.statics.findUserByUsername=(username,cb) => {
  this.model("User").find({username},cb)
}
UserSchema.statics.register=(obj,cb) => {
  this.model('User').insertOne(obj,cb)
}
module.exports= db.model('User',UserSchema);
