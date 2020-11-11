/*
能操作users集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')
const md5 = require('blueimp-md5')

// 2.字义Schema(描述文档结构)
const Schema = mongoose.Schema;
const User = new Schema(
  {
    username:{required:true,type:String},
    password:{required:true,type:String},
    phone: String,
    email: String,
    create_time: {type: Number, default: Date.now},
    role_id: String
  }
)

// 3. 定义Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model("users",User);

// 初始化默认超级管理员用户: admin/admin
UserModel.findOne({username:"admin"},(err,user)=>{
  if(!user){
    new UserModel({username:"admin",password:md5("admin")}).save((err,user)=>{
      console.log("初始化用户: 用户名: admin 密码为: admin")
    })
  }
})
// 4. 向外暴露Model
module.exports = UserModel