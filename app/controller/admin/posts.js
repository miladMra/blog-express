const postModel = require('../../models/posts/posts');
const userModel = require('../../models/users')
const dateServices = require('../../servicess/dateServices');
const postValidator = require('../../validators/post');
const {statuses} = require('../../models/posts/postStatus');
const { v4: uuidv4 } = require('uuid');
exports.index= async(req,res)=>{
    const posts = await postModel.findAll();
    const jalaliPersianDate = posts.map(post=>{
        post.create_at_persian = dateServices.toPersianDate(post.create_at);
        return post;
    })
    res.adminRender('admin/posts/index',{posts:jalaliPersianDate})
}

exports.create=async(req,res)=>{
    const users = await userModel.findAll(['id','full_name']) //id,fullname
    res.adminRender('admin/posts/create',{users})
}
exports.store = async(req,res)=>{
    const fileExt = req.files.thumbnail.name.split('.')[1];
    const newFileName =`${uuidv4}.${fileExt}`;
    const postData={
        title:req.body.title,
        author_id : req.body.author,
        slug:req.body.slug,
        content : req.body.content,
        status:req.body.status,
        thumbnail : newFileName
    }
    const errors = postValidator.create(postData);
    if(errors.length>0){
        req.flash('errors',errors);
        return res.redirect('/admin/posts/create')
    }
    const insertId = await postModel.create(postData);
    if(insertId){
        if(req.files.thumbnail){
            const newFilePath = `${process.env.PWD}/public/upload/thumbnail/${newFileName}`;
            req.files.thumbnail.mv(newFilePath,err=>{
                console.log(err)
            })
        }
        res.redirect('/admin/posts');
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