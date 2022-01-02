const express = require('express');
const router = express.Router();

const dashboardRouter = require('../admin/dashboard');
const postRouter = require('../admin/posts');
const commentRouter = require('../admin/comments');
const userRouter = require('../admin/users');
const settingRouter = require('../admin/settings');

router.use('/dashboard',dashboardRouter);
router.use('/posts',postRouter); 
router.use('/comments',commentRouter); 
router.use('/users',userRouter); 
router.use('/settings',settingRouter); 

module.exports=router;