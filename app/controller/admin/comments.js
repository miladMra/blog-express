const commentModel = require('../../models/comments/comments')
const commentStatus = require('../../models/comments/commentStatus');
const {gravatar} = require('../../servicess/userService');
exports.index = async(req,res)=>{
    const comments = await commentModel.findAll();
    const presentedComments = comments.map(comment=>{
        comment.userAvatar = gravatar(comment.user_email);
        return comment;
    })
    res.adminRender('admin/comments/index',{comments:presentedComments,helpers:{
        commentBakground : function(status,options){
            let cssClass = 'alert ';
            switch(true){
                case status === commentStatus.APPROVED:
                    cssClass += 'alert-success';
                    break;
                case status === commentStatus.REJECTED:
                    cssClass += 'alert-danger';
                    break;
                case status === commentStatus.RIVIEW:
                    cssClass += 'alert-dark';
                    break;
            }
            return cssClass;
        }
    }});
};
exports.approve =async(req,res)=>{
    const commentId = req.params.commentId;
    const result = await commentModel.aprrove(commentId);
    return res.redirect('/admin/comments')
};
exports.reject =async(req,res)=>{
    const commentId = req.params.commentId;
    const result = await commentModel.reject(commentId);
    return res.redirect('/admin/comments')
};
exports.delete =async(req,res)=>{
    const commentId = req.params.commentId;
    const result = await commentModel.delete(commentId);
    return res.redirect('/admin/comments')
};
