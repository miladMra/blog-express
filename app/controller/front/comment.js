const postModel = require('../../models/posts/posts');
const commentModel = require('../../models/comments/comments')
exports.store = async (req,res)=>{
    const post = await postModel.findByID(req.params.post_id);
    if(!post){
        return res.redirect('/404');
    };
    const {user_name,user_email,user_url,user_comments} = req.body;
    const commentData = {
        author_id : 'user' in req.session ? req.session.user.id:null,
        post_id : post.id,
        user_name,
        user_email,
        user_url,
        comments : user_comments
    };
    const result = await commentModel.create(commentData);
    if(result)
    return res.redirect(`/p/${post.slug}`)
}