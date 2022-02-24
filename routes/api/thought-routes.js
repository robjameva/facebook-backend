const router = require('express').Router();
const {
    addComment,
    removeComment,
    addReply,
    removeReply } = require('../../controllers/thought-controller');


router.route('/')
    .get()
    .post()

router.route('/:id')
    .get()
    .put()
    .delete();


router.route('/:id/reactions')
    .post()
    .delete();












module.exports = router;