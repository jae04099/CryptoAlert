var UserReg = require('../models/user_regist')

var express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    const user = new UserReg({

    });
    console.log('post is work')
    try {
        await user.save();
        res.send(res);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;

