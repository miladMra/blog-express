const userModel = require('../../models/users');
const postModel = require('../../models/posts/posts');

const dateServices = require('../../servicess/dateServices');
const postValidator = require('../../validators/post');
const {statuses} = require('../../models/posts/postStatus')
exports.index= async(req,res)=>{
    const users = await userModel.findAll();
    const jalaliPersianDate = users.map(user=>{
        users.create_at_persian = dateServices.toPersianDate(user.create_at)
        return user;
    })
    res.adminRender('admin/users/index',{users:jalaliPersianDate})
}

exports.create=async(req,res)=>{
    res.adminRender('admin/users/create')
}
exports.store = async(req,res)=>{
    const userData={
        full_name:req.body.full_name,
        email : req.body.email,
        password:req.body.password,
        role : req.body.role
    }

    const insertId = await userModel.create(userData);
    console.log(insertId)
    if(insertId){
       return  res.redirect('/admin/users')
    }
}
exports.remove = async(req,res)=>{
    const postId = req.params.postId;
    if(parseInt(postId)==0){
        res.redirect('/admin/posts')
    }
    const result = await postModel.delete(postId);
    res.redirect('/admin/posts')
}
exports.edit=async(req,res)=>{
    const postId = req.params.postId;
    if(parseInt(postId)==0){
        res.redirect('/admin/posts')
    }
    const post = await postModel.find(postId);
    const users = await userModel.findAll(['id','full_name']) //id,fullname
    res.render('admin/posts/edit',{layout:'admin',users,status:statuses,post,helpers:{
        isPostAuthor : function(userId,options){
            return post.author_id === userId ? options.fn(this) : options.inverse(this);
        },
        isSelectedStatus:function(status,options){
            return post.status===status ? options.fn(this) : options.inverse(this);
        }
    }})
}
exports.update = async(req,res)=>{
    const postData={
        title:req.body.title,
        author_id : req.body.author,
        slug:req.body.slug,
        content : req.body.content,
        status:req.body.status
    }
    const postId = req.params.postId;
    if(parseInt(postId)==0){
        res.redirect('/admin/posts')
    };
    const result = await postModel.update(postId,postData)
    res.redirect('/admin/posts')
}