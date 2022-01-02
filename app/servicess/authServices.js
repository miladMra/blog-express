const userModel = require('../models/users');
const hashServices = require('../servicess/hashServices');
const userRoles = require('../models/userRoles')
exports.login = async(email,PlainPassword)=>{
    const user = await userModel.findByEmail(email);
    if(!user){
        return false;
    };

    const{password} = user;

    
    return hashServices.comparePassword(PlainPassword,password)?user:user;
}
exports.register = async(email,password)=>{
  const insertId = await userModel.create({
      full_name:'کاربر ناشناس',
      email,
      password,
      role:userRoles.USER
  });
  return insertId;
}