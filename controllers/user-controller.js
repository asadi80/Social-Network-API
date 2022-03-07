const { User } = require('../models');

const userController = {
// gets all users
  getAllUsers(req, res){
    User.find()
      // .populate({path: 'thought', select:'-__v'})
      .populate({path: 'friends', select:'-__v'})
      .select('-__v')
      .then(userData => res.json(userData))
      .catch(err => res.status(400).json(err))
  },

// get user by id
  getUserById({params}, res){
    User.findOne({_id: params.id})
      // .populate({path: 'thought', select:'-__v'})
      .populate({path: 'friends', select:'-__v'})
      .select('-__v')
      .sort({_id: -1})
      .then(userData => {
        if(!userData){res.status(500).json({message:'no user with this id'}); return;}
        res.json(userData)
      })
      .catch(err => res.status(400).json(err))
  },

  // create user
  createUser({body}, res){
    User.create(body)
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err))
  },

  // update user
  updateUser({params, body}, res){
    User.findOneAndUpdate({_id: params.id}, body,{new:true, runValidators: true})
      .then(userData =>{
        if(!userData){
          res.status(500).json({message: 'no user found uder this id'})
          return;
        }
        res.json(userData)
      })
      .catch(err => res.status(500).json(err))

  },

  // delete user
  deleteUser({params}, res){
    User.findByIdAndDelete({_id: params.id})
    .then(userData =>{
      if(!userData){
        res.status(500).json({message: 'no user found uder this id'})
        return;
      }
      res.json(userData)
    })
    .catch(err => res.status(500).json(err))

  },

  // add friend
  addFriend({params}, res){
    User.findOneAndUpdate({_id:params.id},{$push:{friends: params.friendId}}, {new:true})
      .populate({path: 'friends', select:('-__v')})
      .select('-__v')
      .then(userData => {
        if(!userData){
          res.status(500).json({message:' no user under this id'})
          return;
        }
        res.json(userData)
      })
      .catch(err => res.json(err))
  },

  // delete friend
  deleteFriend({params}, res){
    User.findByIdAndUpdate({_id:params.id}, {$pull: {friends: params.friendId}}, {new: true})
      .populate({path: 'friends', select:('-__v')})
      .select('-__v')
      .then(userData =>{
        if(!userData){
          res.status(500).json({message:'id not found'})
          return;
        }
        res.json(userData)
      })
      .catch(err => res.json(err))
  }


}
module.exports = userController; 