const db = require('../../../database/mysql');
const commentStatus  = require('./commentStatus');

exports.findAll=async()=>{
    const[result] = await db.query(`SELECT c.*,p.title from comments c join posts p on c.post_id=p.id`);
    return result;
};
exports.aprrove = async(commentId)=>{
    const [result] = await db.query(`UPDATE comments SET status=? WHERE id=? limit 1`,[commentStatus.APPROVED,commentId]);
    return result.affectedRows>0;
};
exports.reject = async(commentId)=>{
    const [result] = await db.query(`UPDATE comments SET status=? WHERE id=? limit 1`,[commentStatus.REJECTED,commentId]);
    return result.affectedRows>0;
};
exports.delete = async(commentId)=>{
    const[result] = await db.query('DELETE FROM comments WHERE id= ? limit 1 ',[commentId]);
    return result.affectedRows>0;
};
exports.create = async(commentData)=>{
    const[result] = await db.query('INSERT INTO comments set ? ',[commentData]);
    return result.insertId;
};
exports.findByPostId = async(postId,status = commentStatus.APPROVED)=>{
    const[result] = await db.query(`SELECT * from comments where post_id=? and status =?`,[postId,status]);
    return result;
};
