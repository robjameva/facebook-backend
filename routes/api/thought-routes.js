const router = require('express').Router();
const {
    addThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');


router.route('/')
    .get(getAllThoughts)
    .post(addThought)

router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);


router.route('/:id/reactions')
    .post()
    .delete();












module.exports = router;