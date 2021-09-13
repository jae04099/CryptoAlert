const send_message = require('./sens');
const WebSocket = require('ws')
// const Upbit = require('./upbit_lib')
// const timeout = ms => new Promise(res => setTimeout(res, ms))

// const upbit = new Upbit('secret-key', 'access-key')

// let trades = {}

// let resList = []
// resList.push({
//     market: 'KRW-TRX',
//     cut_price: 41.6,
//     volume: 3.3
// })
// resList.push({
//     market: 'KRW-STEEM',
//     cut_price: 437,
//     volume: 5
// })

// function tradeServerConnect(codes) {
//     var ws = new WebSocket('wss://api.upbit.com/websocket/v1');
//     ws.on('open', ()=>{
//         console.log('ticker websocket is connected')
//         ws.send('[{"ticket":"test"},{"type":"ticker","codes":["KRW-BTC"]}]')
//     })  
//     ws.on('close', ()=>{
//         console.log('ticker websocket is closed');
//         setTimeout(function() {
//             console.log('trade 재접속');
//             tradeServerConnect(codes);
//         }, 1000);
//     })  
//     ws.on('message', (data)=>{
//         try {
//             var str = data.toString('utf-8')
//             var json = JSON.parse(str)
//             trades[json.cd] = json
//         } catch (e) {
//             console.log(e)
//         }
//     })
// }

// tradeServerConnect('KRW-ETH')

// function searchLoop(market) {
//     // 현황 (10초 반복)
//     setInterval(async ()=>{
//         if (!trades[market]) return;
//         if (!trades[market].tp) return;
//         let tradePrice = parseFloat(trades[market].tp)
//         if (!tradePrice) return;

//         for (let item of resList) {
//             if (item.market==market) {
//                 console.log('[', market, '손절가', item.cut_price, '현재가', tradePrice, '('+(tradePrice-item.cut_price).toFixed(2)+')', ']')
//             }
//         }
//     }, 10000);

//     // 손절처리 (1초 반복)
//     setInterval(async ()=>{
//         if (!trades[market]) return;
//         if (!trades[market].tp) return;
//         let tradePrice = parseFloat(trades[market].tp)
//         if (!tradePrice) return;

//         // resList에서 손절대상 찾기
//         let found = resList.findIndex((el)=>{
//             return el.market==market && el.cut_price >= tradePrice
//         })
//         // 찾았으면..
//         if (found!=-1) {
//             console.log('손절처리!')
//             console.log('tradePrice:'+tradePrice)

//             let json;
//             json = await upbit.trade_orderbook(resList[found].market)
//             if (!json.success) {
//                 console.log('upbit.trade_orderbook')
//                 console.log(json.message)
//                 return;
//             }

//             let sellPrice = json.data[0].orderbook_units[0].bid_price
//             console.log('sellPrice:'+sellPrice)

//             console.log('--order_ask')
//             json = await upbit.order_ask(resList[found].market, resList[found].volume, sellPrice)
//             //json = {success:true}
//             if (json.success) {
//                 resList.splice(found,1)
//                 console.log('처리완료!')
//                 console.log(resList)
//             } else {
//                 console.log(json.name)
//                 console.log(json.message)
//             }
//         }
//     }, 1000);
// }

// async function start() {
//     let {data:markets} = await upbit.market_all()

//     console.log('마켓수:'+markets.length)

//     let code_list = []
//     for (let item of markets) {
//         // KRW-ETH BTC-ETH ..
//         let [currency, coin] = item.market.split('-')
//         // 원화만
//         if (currency!='KRW') continue

//         trades[item.market] = {}
//         code_list.push('"'+item.market+'"')

//         searchLoop(item.market)
//     }
//     console.log('원화마켓수:'+code_list.length)

//     // 체결 서버 접속
//     tradeServerConnect(code_list.join(','))
// }

// start()

function webSocket(coin_name, coin_code, alert_price, nickname, phone_number){
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

        
        function getTradePrice(arr){
            const start = arr.split('"trade_price":')[1]
            const end = start.split(",")[0]
            return end
        }
        function tickerObserver(alert_price, end){
            if(parseFloat(end) == alert_price){
                return 'same'
            }
        }
        
        function onMessage(evt) {
            var enc = new TextDecoder("utf-8");
            var arr = new Uint8Array(evt.data);
            let targetPrice = Math.floor(getTradePrice(enc.decode(arr)))
            if(tickerObserver(alert_price, targetPrice) == 'same'){
                websocket.close();
            }
        }

        function onError(evt) {
            console.log('에러:' + evt.data);
        }

        function doSend(message) {
            websocket.send(message);
        }

        // function writeToScreen(message) {
        //     var pre = document.createElement("p");
        //     pre.style.wordWrap = "break-word";
        //     pre.innerHTML = message;
        //     output.appendChild(pre);
        // }

        init()
}

module.exports = webSocket;
