const { Thought, User } = require('../models');

const thoughtController = {
    async addThought({ body }, res) {
        try {
            const dbThoughtData = await Thought.create(body)
            const dbUserData = await User.findOneAndUpdate(
                { _id: body.userID },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );

            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbThoughtData);


        } catch (error) {
            res.json(error)
        }
    },

    async getAllThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find({})
                .select('-__v')
                .populate('userID', 'username')

            res.json(dbThoughtData)

        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getThoughtById({ params }, res) {
        try {
            const dbThoughtData = await Thought.findOne({ _id: params.id })
                .select('-__v')

            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);

        } catch (error) {
            res.status(400).json(error);
        }
    },

    async updateThought({ params, body }, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })

            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData)

        } catch {
            res.status(400).json(err)
        }
    },

    async deleteThought({ params }, res) {
        try {
            const dbThoughtData = await Thought.findOneAndDelete({ _id: params.id })

            const dbUserData = await User.findOneAndUpdate(
                { thoughts: params.id },
                { $pull: { thoughts: params.id } },
                { new: true }
            );

            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbThoughtData);

        } catch (error) {
            res.json(error)
        }
    },

    async addReaction({ params, body }, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: params.thoughtID },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            )

            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);

        } catch (error) {
            res.json(err)
        }
    },

    async removeReaction({ params, body }, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: params.thoughtID },
                { $pull: { reactions: { reactionID: body.reactionID } } },
                { new: true }
            )
            res.json(dbThoughtData)

        } catch (error) {
            res.json(err)
        }
    },

};

module.exports = thoughtController;