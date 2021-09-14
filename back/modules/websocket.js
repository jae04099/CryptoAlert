const send_message = require('./sens');
const WebSocket = require('ws')

function webSocket(coin_name, coin_code, alert_price, nickname, phone_number) {
    var wsUri = "wss://api.upbit.com/websocket/v1";

    function init() {
        testWebSocket();
    }

    function testWebSocket() {
        websocket = new WebSocket(wsUri);
        websocket.binaryType = 'arraybuffer';
        websocket.onopen = function (evt) { onOpen(evt); };
        websocket.onclose = function (evt) { onClose(evt) };
        websocket.onmessage = function (evt) { onMessage(evt) };
        websocket.onerror = function (evt) { onError(evt) };
    }

    function onOpen(evt) {
        console.log("연결완료");
        var msg = [
            {
                "ticket": "UNIQUE_TICKET",
            },
            {
                "type": "ticker",
                "codes": [coin_code]
            }
        ];

        msg = JSON.stringify(msg);
        doSend(msg);
    }

    async function onClose(evt) {
        await console.log("연결해제");
        await send_message(coin_name, nickname, phone_number, alert_price)
        await console.log("send message!")
    }


    function getTradePrice(arr) {
        const start = arr.split('"trade_price":')[1]
        const end = start.split(",")[0]
        return end
    }
    function tickerObserver(alert_price, end) {
        if (parseFloat(end) == alert_price) {
            return 'same'
        }
    }

    function onMessage(evt) {
        var enc = new TextDecoder("utf-8");
        var arr = new Uint8Array(evt.data);
        let targetPrice = Math.floor(getTradePrice(enc.decode(arr)))
        if (tickerObserver(alert_price, targetPrice) == 'same') {
            websocket.close();
        }
    }

    function onError(evt) {
        console.log('에러:' + evt.data);
    }

    function doSend(message) {
        websocket.send(message);
    }

    init()
}

module.exports = webSocket;
