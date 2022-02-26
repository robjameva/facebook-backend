const { Thought, User } = require('../models');

const thoughtController = {
    addThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err))
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err))
    }

    //     addReply({ params, body }, res) {
    //         Comment.findOneAndUpdate(
    //             { _id: params.commentId },
    //             { $push: { replies: body } },
    //             { new: true, runValidators: true }
    //         )
    //             .then(dbPizzaData => {
    //                 if (!dbPizzaData) {
    //                     res.status(404).json({ message: 'No pizza found with this id!' });
    //                     return;
    //                 }
    //                 res.json(dbPizzaData);
    //             })
    //             .catch(err => res.json(err));
    //     },

    //     // remove reply
    //     removeReply({ params }, res) {
    //         Comment.findOneAndUpdate(
    //             { _id: params.commentId },
    //             { $pull: { replies: { replyId: params.replyId } } },
    //             { new: true }
    //         )
    //             .then(dbPizzaData => res.json(dbPizzaData))
    //             .catch(err => res.json(err));
    //     },

    //     // remove comment
    //     removeComment({ params }, res) {
    //         Comment.findOneAndDelete({ _id: params.commentId })
    //             .then(deletedComment => {
    //                 if (!deletedComment) {
    //                     return res.status(404).json({ message: 'No comment with this id!' });
    //                 }
    //                 return Pizza.findOneAndUpdate(
    //                     { _id: params.pizzaId },
    //                     { $pull: { comments: params.commentId } },
    //                     { new: true }
    //                 )
    //             })
    //             .then(dbPizzaData => {
    //                 if (!dbPizzaData) {
    //                     res.status(404).json({ message: 'No pizza found with this id!' });
    //                     return;
    //                 }
    //                 res.json(dbPizzaData);
    //             })
    //             .catch(err => res.json(err));
    //     }
};

module.exports = thoughtController;