const {User, Thought} = require('../models');

const thoughtsController = {
// create thought
    createThought({params,body}, res){
        Thought.create(body)
            .then(({_id}) =>{
                return User.findOneAndUpdate({_id: params.userId}, {$push: {thought: _id}}, {new: true})
            })
            .then(thoughtsData => {
                if(!thoughtsData){res.status(404).json({message: 'no user with this id'}) ; return;}
                res.json(thoughtsData)
            })
            .catch(err => res.json(err))
    },
//-----------------------------------------------------------------------------------------------------------------------------
// getting all thoughts
    getAllThoughts(req, res){
        Thought.find({})
        .populate({path: 'reactions', selecte: '-__v'})
        .select('-__v')
        .sort({_id: -1})
        .then(thoughtsData => res.json(thoughtsData))
        .catch(err =>  res.status(400).json(err))
    },
//-----------------------------------------------------------------------------------------------------------------------------
// get thought by id
    getThoughtById({params}, res){
        Thought.findOne({_id: params.id})
        .populate({path: 'reactions', selecte: '-__v'})
        .selecte('-__v')
        .then(thoughtsData => {
            if(!thoughtsData){ res.status(404).json({message: 'no thoughts with this id'}); return;}
            res.json(thoughtsData)
        })
        .catch(err => res.json(err))
    },
//-----------------------------------------------------------------------------------------------------------------------------
// updating thought
    updateThought({params, body}, res){
        Thought.findOneAndUpdate({_id: params.id}, body, {new:true, runValidators: true})
        .then(thoughtsData =>{
            if(!thoughtsData){res.status(404).json({message: 'no thoughts under this id'}); return;}
            res.json(thoughtsData)
        } )
        .catch(err => res.json(err))
    },
//-----------------------------------------------------------------------------------------------------------------------------
// deleting thought
    deleteThought({params}, res){
        Thought.findOneAndDelete({_id: params.id})
        .then(thoughtsData => {
            if(!thoughtsData){ res.status(404).json({message:'no thoughts under this id'}); return;}
            res.json(thoughtsData)
        })
        .catch( err => res.json(err))

    },
//-----------------------------------------------------------------------------------------------------------------------------
// adding reaction
    addReaction({params, body}, res){
        Thought.findOneAndUpdate({_id: params.thoughtId},{$push: {reactions:body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', selecte:'-__v'})
        .select('-__v')
        .then( thoughtsData => {
            if(!thoughtsData){ res.status(404).json({message: 'no thoughts under this id'}); return;}
            res.json(thoughtsData)
        })
        .catch(err => res.json(err))

    },
//-----------------------------------------------------------------------------------------------------------------------------
// deleting reaction
    deleteReaction({params}, res){
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(thoughtsData => {
            if(!thoughtsData){ res.status(404).json({message:'no thoughts under this id'}); return;}
            res.json(thoughtsData)
        })
        .catch( err => res.json(err))

    }

}

module.exports = thoughtsController; 