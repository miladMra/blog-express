const statictic = require('../../models/statictic')
exports.index= async(req,res)=>{
    const data={
        totalUser:await statictic.totalUser(),
        totalPost:await statictic.totalPost(),
        totalComment:await statictic.totalComment(),
        totalViews:await statictic.totalViews()
    }
    res.adminRender('admin/dashboard/index',{...data})
}