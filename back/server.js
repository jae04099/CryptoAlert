require('dotenv').config();
require('./models/user_regist');


var express     = require('express');
var app         = express();
var cors = require('cors');
var mongoose    = require('mongoose');
var getRouter = require('./routes/getRouter');
var postRouter = require('./routes/postRouter');

// CONNECT TO MONGODB SERVER
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { 
    dbName:'crypto_alert',
    useNewUrlParser: true,
}).then(() => console.log('Successfully connected to mongodb'))
.catch(e => console.error(e));

var db = mongoose.connection;
db.on('error', console.error);
// DEFINE MODEL

// [CONFIGURE APP TO USE bodyParser]
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/get', getRouter);
app.use('/submit', postRouter);

// [CONFIGURE SERVER PORT]

var port = process.env.PORT || 5000;


// [RUN SERVER]
app.listen(port, function(){
 console.log("Express server has started on port " + port)
});