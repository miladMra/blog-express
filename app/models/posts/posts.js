const db = require('../../../database/mysql');

exports.find=async(postID)=>{
    const[result] = await db.query(`SELECT p.*,u.full_name from posts p left join users u on p.author_id=u.id WHERE P.id=? limit 1`,[postID]);
    return result.length>0?result[0]:fasle;
};
exports.findAll=async(page,perpage)=>{
    const offset = (page-1) * perpage
    const[result] = await db.query(`SELECT p.*,u.full_name from posts p left join users u on p.author_id=u.id ORDER BY p.create_at DESC
    limit ${offset},${perpage}
    `);
    return result;
};

exports.count=async()=>{
    const[result] = await db.query(`SELECT COUNT(id) as postCounter FROM posts`);
    return result[0].postCounter;
};

exports.create = async(postData)=>{
    const[result] = await db.query('INSERT INTO posts set ? ',[postData]);
    return result.insertId;
};

exports.delete = async(postId)=>{
    const[result] = await db.query('DELETE FROM posts WHERE id= ? limit 1 ',[postId]);
    return result.affectedRows>0;
};

exports.update = async(postId,updateFiled)=>{
    const [result] = await db.query('UPDATE posts SET ? WHERE id=? limit 1',[updateFiled,postId]);
    return result.affectedRows>0;
};

exports.findBySlug=async(postSlug)=>{
    const[result] = await db.query(`SELECT * FROM posts WHERE slug=? limit 1`,[postSlug]);
    return result[0];
};
exports.findByID=async(postID)=>{
    const[result] = await db.query(`SELECT * FROM posts WHERE id=? limit 1`,[postID]);
    return result[0];
};

exports.findByKeywords=async(keyWords)=>{
    const[result] = await db.query(`SELECT p.*,u.full_name from posts p left join users u on p.author_id=u.id WHERE p.title like ?
     ORDER BY p.create_at DESC`,['%'+keyWords+'%']);
    return result;
};

exports.latestPost=async(limit=10)=>{
    const[result] = await db.query(`SELECT p.*,u.full_name from posts p left join users u on p.author_id=u.id
     ORDER BY p.create_at DESC limit ${limit}`);
    return result;
};