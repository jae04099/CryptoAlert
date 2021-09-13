const mongoose = require('mongoose');

const user_registration = new mongoose.Schema({
    coin_name:{
        type: String,
    },
    coin_code:{
        type: String,
    },
    alert_price:{
        type: Number,
    },
    nickname:{
        type: String,
    },
    phone_number:{
        type: Number,
    },
    agreement:{
        type: Number,
    }
});

const User_regist = mongoose.model('User_regist', user_registration);

module.exports = User_regist;
