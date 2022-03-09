const router = require('express').Router();

const {getAllThoughts, createThought, getThoughtById, updateThought, deleteThought,addReaction, deleteReaction } = require('../../controllers/thought-controller');

// getting all thoughts route
router.route('/').get(getAllThoughts);

// getting thought by id, update and delete thought by id route
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// creating thought route
router.route('/:userId').post(createThought);

// add reactino route
router.route('/:thoughtId/reactions').post(addReaction);

// delete reaction route
router.route('/:thoughtId/:reactionId').delete(deleteReaction)



module.exports = router;

