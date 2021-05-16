const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User, Comment, Post } = require('../../models');

router.get('/post', async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: ['id', 'title', 'content', 'created_at'],
            order: [
                ['created_at', 'DESC'],
            ],
            include: [{
                model: User,
                attributes: ['name']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            }
            ]
        }).then(postData => {
            res.json(postData.reverse())
        })
    } catch (err) {
        res.status(500).json(err)
    };
});

router.post('/post/:id', async (req, res) => {
    try {
        const postId = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'content', 'title', 'created_at'],
            include: [
                {
                model: User,
                attributes: ['name']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            }
            ]

        }).then(postId => {
            if (!postId) {
                res.status(404).json({ message: 'no post found matching this id' });
            }
            res.json(postData)
        })
    } catch (err) {
        res.status(500).json(err)
    };
});

router.post('/post', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,          
        }).then(postData => res.json(postData))
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

router.put('/post/:id', withAuth, async (req, res) => {
    try {
        const postUpdate = await Post.update({
            title: req.body.title,
            content: req.body.content
        },
            {
                where: {
                    id: req.params.id
                }
            }).then(postDBData => {
                if (!postDBData) {
                    res.status(404).json({ message: 'no post found matching that id' });
                    return;
                }
                res.json(postDBData)

            })
    } catch (err) {
        res.status(500).json(err)
    };
});

router.delete('/post/:id', withAuth, async (req, res) => {
    try {
        const postDelete = await Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'Nothing Found.' });
                return;
            }
            res.json(postData)
        })
    } catch (err) {
        res.status(500).json(err)
    };
});

router.get('/comment', async (req, res) => {
    try {
        const comments = await Comment.findAll({})
            .then(commentData => res.json(commentData))
    } catch (err) {
        res.status(500).json(err)
    };
});

router.post('/comment', withAuth, async (req, res) => {
    if (req.session)
        try {
            const commentId = await Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                user_id: req.session.user_id          
            }).then(commentId => res.json(commentId))
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        };
});

router.delete('/comment/:id', withAuth, async (req, res) => {
    try {
        const commentDelete = await Comment.destroy({
            where: {
                id: req.params.id,
            }
        }).then(commentData => {
            if (!commentData) {
                res.status(404).json({ message: 'nNo comment found.' });
                return;
            }
            res.json(commentData);
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;
