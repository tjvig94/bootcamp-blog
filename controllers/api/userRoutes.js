const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        }).then(userData => res.json(userData))

    } catch (err) {
        res.status(500).json(err)
    };
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
    
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
    
            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
  });

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
     
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }
  
        const validPassword = await userData.checkPassword(req.body.password);
  
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }
  
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;  
            res.json({ user: userData });
        }); 
    }   catch (err) {
        res.status(400).json(err);
    }
  });

router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/').end();
        });
    } else {
        res.status(400).end();
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.destroy({
            where: {
                id: req.params.id
            }
        }).then(deletedUser => {
            if (!deletedUser) {
                res.status(404).json({message: 'No user found.'});
                return;
            }
            res.json(deletedUser);
        })
    } catch (err) {
        res.status(500).json(err)
    };
});

module.exports = router;
