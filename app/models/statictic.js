const db = require('../../database/mysql');

exports.totalUser = async ()=>{
    const[result] = await db.query('SELECT COUNT(id) as totalUsers from users');
    return result[0].totalUsers;
};
exports.totalPost = async ()=>{
    const[result] = await db.query('SELECT COUNT(id) as totalPosts from posts');
    return result[0].totalPosts;
};
exports.totalComment = async ()=>{
    const[result] = await db.query('SELECT COUNT(id) as totalComments from comments');
    return result[0].totalComments;
};
exports.totalViews = async ()=>{
    const[result] = await db.query('SELECT SUM(views) as totalViews from posts');
    return result[0].totalViews;
};