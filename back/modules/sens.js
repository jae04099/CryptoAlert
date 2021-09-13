function send_message(coin_name, nickname, phone,alert_price) {
    var user_phone_number = phone;
    var user_nickname = nickname;
    var user_coin_name = coin_name;
    var user_alert_price = alert_price;
    var resultCode = 404;
    const axios = require('axios');
    const CryptoJS = require('crypto-js');
    const date = Date.now().toString();
    const serviceId = process.env.SENS_SERVICE_ID; 
    const secretKey = process.env.SENS_SECRET_KEY;
    const accessKey = process.env.SENS_ACCESS_KEY;
    const my_number = process.env.SENS_MYNUM;
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
    const url2 = `/sms/v2/services/${serviceId}/messages`;

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);

    axios({
        method: method,
        url: url,
        headers: {
            "Contenc-type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": accessKey,
            "x-ncp-apigw-timestamp": date,
            "x-ncp-apigw-signature-v2": signature,
        },
        data: {
            type: "SMS",
            countryCode: "82",
            from: my_number,
            content: `${user_nickname}님 ${user_coin_name} 이 ${user_alert_price}원에 도달하였습니다!`,
            messages: [
                { to: `${user_phone_number}`, },],
        },
    }).then(res => {
        console.log(res.data);
    })
        .catch(err => {
            console.log(err);
        })
    return resultCode;
}

module.exports = send_message;