const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: false },
    imageUrl: { type: String, required: false },
    likes: { type: Number, required: false},
    dislikes: { type: Number, required: false},
    usersLiked: { type: [String], required: false},
    usersDisliked: { type: [String], required: false},
});

module.exports = mongoose.model('Comment', commentSchema);