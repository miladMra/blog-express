const userRoles = require('@models/userRoles');
module.exports = (req,res,next)=>{
    if( req.session.hasOwnProperty('user')){
        return res.redirect('/');
    };
    next();
}