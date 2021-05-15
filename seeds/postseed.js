const { Post } = reqire('../models');

const postData = [
    {
        title: "Pizza Post",
        content: "This is an amazing post about pizza. I love it so much. Pineapple-Jalepeno is god-tier. Fight me in the comments.",
        user_id: 1
    },
    {
        title: "Response to Pizza Post",
        content: "This is a call-out post in response to the Pizza Post. Pineapple goes nowhere near a pizza. Get it away.",
        user_id: 2
    },
    {
        title: "Response to the response to Pizza Post",
        content: "I have determined that it is in the best interest of the community that I write an official response to the pizza controversy. I will let you know when it is posted.",
        user_id: 3
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
