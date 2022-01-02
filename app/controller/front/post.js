const postModel = require('../../models/posts/posts');
const userMOdel = require('../../models/users');
const commentMOdel = require('../../models/comments/comments');
const userServices = require('../../servicess/userService');
const dateServices = require('../../servicess/dateServices');
const _ = require('lodash')
exports.showPost = async(req,res)=>{
    const postSlug = req.params.post_slug;
    const post = await postModel.findBySlug(postSlug);
    if(!post){
        return res.redirect('/404')
    };
    
    const user = await userMOdel.find(post.author_id);
    user.avatar = userServices.gravatar(user.email);
    post.author = user;
    const comments = await commentMOdel.findByPostId(post.id);
    
    const presentedComments = comments.map(comment=>{
        comment.avatar =userServices.gravatar(comment.user_email);
        comment.create_at_persian = dateServices.toPersianDate(post.create_at);
        return comment;
    });

    const newComments = _.groupBy(presentedComments,'parent');
    console.log(newComments)
    res.frontRender('front/post/single',{post,comments:newComments[0],bodyClass : 'single-post',helpers:{
        hasChildren:function(commentId,option){
            return commentId in newComments
        },
        getChildren:function(commentId){
            return newComments[commentId];
        }
    }})

}