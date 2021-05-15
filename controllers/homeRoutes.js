const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('sign-up');
});

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name'],
                    },
                },
                {
                    model: User,
                    attributes: ['name']

                }
            ]
        }).then(postDB => {
            const posts = postDB.map(post => post.get({ plain: true }));
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postId = await Post.findOne({
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
        }).then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'no post found matching with this id' });
                return;
            }
            const post = postData.get({ plain: true });
            console.log(post);
            res.render('single-post', { post, loggedIn: req.session.loggedIn });
        })
    } catch (err) {
        res.status(500).json(err)
    };
});

router.get('/post-comments', async (req, res) => {
    try {
        const postComment = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'content', 'title', 'created_at'],
            include: [{
                model: Comment,
                attributes: ['id', 'comment-text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['name'],
                }
            },
            {
                model: User,
                attributes: ['name'],
            }
            ]
        }).then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'no post found matching this id' });
                return;
            }
            const post = postDBData.get({ plain: true});
            res.render('post-comments', { post, loggedIn: req.session.loggedIn});
        })
    } catch (err) {
        res.status(500).json(err)
    };
});

module.exports = router;
