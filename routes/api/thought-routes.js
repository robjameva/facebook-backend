const router = require('express').Router();
const {
    addThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');


router.route('/')
    .get(getAllThoughts)
    .post(addThought)

router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);


router.route('/:thoughtID/reactions')
    .post(addReaction)
    .delete(removeReaction);












module.exports = router;