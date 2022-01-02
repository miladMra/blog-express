const db = require('../../../database/mysql');


exports.findAll = async (columns=[])=>{
    const sqlColumns = columns.length>0 ? columns.join(',') : '*'
    //[id,fulL_name] => 'id,full_name'
    const[rows,field] = await db.query(
        `select ${sqlColumns}
        from setting`);
    return rows;
};

exports.update=async(updateFields)=>{
    console.log(Object.keys(updateFields))
    Object.keys(updateFields).forEach(setting_name=>{
        db.query(`update setting set setting_value=? where setting_name=?`,[updateFields[setting_name],setting_name]);
    })
};
exports.get = async(key)=>{
    const[rows] = await db.query(`select setting_value from setting where setting_name=? limit 1`,[key]);
    return rows.length>0?rows[0].setting_value : null;
}