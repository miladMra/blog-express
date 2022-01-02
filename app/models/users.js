const db = require('../../database/mysql');
const hashService = require('../servicess/hashServices')
exports.find=async(postAuthorID)=>{
    const[result] = await db.query(`SELECT * FROM users where id=? limit 1`,[postAuthorID]);
    return result.length>0?result[0]:fasle;
};

exports.findAll = async (columns=[])=>{
    const sqlColumns = columns.length>0 ? columns.join(',') : '*'
    //[id,fulL_name] => 'id,full_name'
    const[rows,field] = await db.query(
        `select ${sqlColumns}
        from users`);
    return rows;
};

exports.findByEmail = async (email)=>{
    const[rows] = await db.query(
        `select *
        from users
        WHERE email=? limit 1`,[email]);
    return rows.length===1?rows[0]:null;
};

exports.create = async(userData)=>{
    const hashedPassword = hashService.hashPassword(userData.password);
    const updateUserData = {...userData,password:hashedPassword}
    const[result] = await db.query('INSERT INTO users set ? ',[updateUserData]);
    return result.insertId;
}

exports.delete = async(postId)=>{
    const[result] = await db.query('DELETE FROM posts WHERE id= ? limit 1 ',[postId]);
    return result.affectedRows>0;
};

exports.update = async(postId,updateFiled)=>{
    const [result] = await db.query('UPDATE posts SET ? WHERE id=? limit 1',[updateFiled,postId]);
    return result.affectedRows>0;
}