var UserReg = require('../models/user_regist')

var express = require('express');
const router = express.Router();
const webSocket = require('../modules/websocket');

router.post('/', async (req, res, next) => {
    const coin_name = req.body.coin_name
    const coin_code = req.body.coin_code
    const alert_price = req.body.alert_price
    const nickname = req.body.nickname
    const phone_number = req.body.phone_number
    const agreement = req.body.agreement
    const user = new UserReg({
        coin_name,
        coin_code,
        alert_price,
        nickname,
        phone_number,
        agreement
    });
    res.setHeader('Content-Type', 'application/json')

    console.log('post is work')
    try {
        await user.save()
        await webSocket(coin_name, coin_code, alert_price, nickname, phone_number)

    }catch(err){
        console.log(err)
    }
});

module.exports = router;

