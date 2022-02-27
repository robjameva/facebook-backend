const { User, Thought } = require('../models');

const userController = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const dbUserData = await User.find({}).select('-__v')
            res.json(dbUserData)

        } catch (error) {
            res.status(400).json(error);
        }
    },

    // get one user by id
    async getUserById({ params }, res) {
        try {
            const dbUserData = await User.findOne({ _id: params.id }).select('-__v')

            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);

        } catch (error) {
            res.status(400).json(error);
        }
    },

    // create user
    async createUser({ body }, res) {
        try {
            const dbUserData = await User.create(body)
            res.json(dbUserData)
        } catch (error) {
            res.status(400).json(error)
        }


    },

    async addFriend({ params, body }, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.id },
                { $push: { friends: params.friendId } },
                { new: true, runValidators: true }
            )
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.json(dbUserData)

        } catch (error) {
            res.status(400).json(error)
        }
    },

    async removeFriend({ params, body }, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.id },
                { $pull: { friends: params.friendId } },
                { new: true, runValidators: true }
            )

            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.json(dbUserData)
        } catch (error) {
            res.status(400).json(error)
        }
    },

    // update user
    async updateUser({ params, body }, res) {
        try {
            const dbUserData = await User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })

            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData)

        } catch (error) {
            res.status(400).json(error)

        }
    },

    // delete user
    async deleteUser({ params }, res) {

        try {
            const dbUserData = await User.findOneAndDelete({ _id: params.id })
            const dbThoughtData = await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })


            Promise.all([dbUserData, dbThoughtData])

            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.json({ "msg": 'User deleted' })

        } catch (error) {
            res.status(400).json(error)
        }

    }
};

module.exports = userController;