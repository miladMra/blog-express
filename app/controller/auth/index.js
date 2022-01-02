const authService = require('../../servicess/authServices');
const userRoles = require('../../models/userRoles');
exports.showLogin = (req,res)=>{

    res.newRender('auth/login',{layout:'auth'})
}
exports.doLogin =async (req,res)=>{
    const{email,password} = req.body;
    const user = await authService.login(email,password);
    console.log(user)
    if(!user){
        req.flash('errors',['ایمیل یا کلمه عبور صحیح نمی باشد']);
        return res.redirect('/auth/login')
    };

    req.session.user=user;
    const pathToRedirect = user.role === userRoles.ADMIN ? '/admin/dashboard' : '/';
    return res.redirect(pathToRedirect)
}
exports.showRegister = (req,res)=>{
    res.newRender('auth/register',{layout:'auth'});

}
exports.doRegister = async(req,res)=>{
    const{email,password,password_confirmation} = req.body;
    const newUserId = await authService.register(email,password);
    if(!newUserId){
        req.flash('errors',['در حال حاظر امکان ثبت نام وجود ندارد']);
        return res.redirect('/auth/register')
    };
    return res.redirect('/auth/login')

};
exports.logout = (req,res)=>{
    req.session.destroy(err=>{
        if(err){
            console.log(err)
        };
        return res.redirect('/auth/login')
    })
};