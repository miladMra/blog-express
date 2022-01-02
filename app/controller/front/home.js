const postModel = require('../../models/posts/posts');
const dateServices = require('../../servicess/dateServices')
exports.index = async(req,res)=>{
    const page = 'page' in  req.query ? parseInt(req.query.page) : 1;
    const perpage = 7;
    const posts = await postModel.findAll(page,perpage);
    const totalPost = await postModel.count();
    const totalPage = Math.ceil( totalPost/perpage);
    const pagination = {
        page,
        totalPage,
        nextPage : page<totalPage?page+1:totalPage,
        prevPage : page>1?page-1:1,
        hasNextPage : page<totalPage,
        hasPrevPage : page>1
    };
    const postsPresented = posts.map(post=>{
        post.create_at_persian = dateServices.toPersianDate(post.create_at);
        post.excerpt = dateServices.excerpt(post)
        return post;
    });
    const latestPost = await postModel.latestPost(3)
    res.frontRender('front/home',{posts:postsPresented,latestPost,pagination,helpers:{
        showDisabled : function (isDisabled,option){
            return !isDisabled? 'disabled':'';
        }
    }});
};
exports.search = async (req,res)=>{
    const posts = await postModel.findByKeywords(req.query.keyWords);
    const postsPresented = posts.map(post=>{
        post.create_at_persian = dateServices.toPersianDate(post.create_at);
        post.excerpt = dateServices.excerpt(post)
        return post;
    })
    res.frontRender('front/search',{posts:postsPresented});
}
