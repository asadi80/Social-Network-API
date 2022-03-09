const router = require('express').Router();

const { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend,deleteFriend} = require('../../controllers/user-controller');

//getting all user and creat user route 
router.route('/').get(getAllUsers).post(createUser);

// getting user by id, update and delete user by id route
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// add and delete friend route
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)




module.exports = router;