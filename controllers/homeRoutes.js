const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {   
    try {
        const postData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: [{
                        model: User,
                        attributes: ['name'],
                    }]
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts });
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
});

router.get('/new', async (req, res) => {
    try {
        res.render('new-post');
    } catch (error) {
       res.status(500).json(error);
       console.log(error); 
    }
})

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'content', 'title', 'created_at'],

            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                    model: User,
                    attributes: ['name']
                    },
                },
                {
                    model: User,
                    attributes: ['name']

                },
            ]
        });
            if (!postData) {
                res.status(404).json({ message: 'no post found matching with this id' });
                return;
            }
            const post = postData.get({ plain: true });
            console.log(post.comments);
            res.render('single-post', post);        
    } catch (err) {
        res.status(500).json(err)
    };
});

module.exports = router;
