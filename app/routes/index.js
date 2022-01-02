const adminRouter = require('./admin');
const authRouter = require('./auth');
const frontRouter = require('./front');

const auth = require('../middlewares/auth');
const guest = require('../middlewares/guest');
const logoutController = require('../controller/auth')
module.exports = app=>{
    app.use('/',frontRouter)
    app.use('/admin',[auth],adminRouter);
    app.use('/auth',[guest],authRouter);
    app.use('/logout',logoutController.logout)
}