const { Schema, model, Types } = require('mongoose')
const dateFormat = require('../utils/dateFormat')

const ReactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent thought _id
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            trim: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        },
        _id: false
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);


// ThoughtSchema.virtual('Username').get(function() {
//     console.log(this)
//     return this.parent().username
// })

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

// create the Comment model using the CommentSchema
const Thought = model('Thought', ThoughtSchema);

// export the Comment model
module.exports = Thought;