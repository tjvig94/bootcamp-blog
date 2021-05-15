const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "I love jalepenos!",
        user_id: 3,
        post_id: 1
    },
    {
        comment_text: "This is trash.",
        user_id: 2,
        post_id: 1
    },
    {
        comment_text: "Can't wait for this...",
        user_id: 2,
        post_id: 3
    }
]

const seedComments = () => CommentbulkCreate(commentData);

module.exports = seedComments;
