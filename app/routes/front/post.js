const express = require('express');
const router = express.Router();
const postController = require('../../controller/front/post');
const commentController = require('../../controller/front/comment');
router.get('/p/:post_slug',postController.showPost);
router.post('/p/:post_id/comments',commentController.store)


module.exports = router;