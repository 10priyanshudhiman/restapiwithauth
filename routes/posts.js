const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify , (req,res)=> {
    res.json({
        posts: {
            title: 'my first Post',
            description: 'random data you should not access'
        }
    });
});

module.exports = router;