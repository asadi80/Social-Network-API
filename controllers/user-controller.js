const {User} = require('../models');

const userController = {
// gets all users
  getAllUsers(req, res){
    User.find({})
      .then(userData => res.json(userData))
      .catch(err => res.status(400).json(err))
  },

// get use by id
  getUserById(reg, res){
    User.findOne({_id: URLSearchParams.id})
      .then(userData => res.json(userData))
      .catch(err => res.status(400).json(err))
  }

}