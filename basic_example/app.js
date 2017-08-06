var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 3000;

var fs = require('fs')


// use this to be able to parse json in advance. 
// ... otherwise in request.body will not be available
app.use(bodyParser.urlencoded({"extended":true}));
app.use(bodyParser.json());

var loginRouter = express.Router();
var rolesRouter = express.Router();

// define get route, request handler and send json response
// this is just temp examples. next step is to build controllers and models.
loginRouter.route('/login')
    .get(function(req,res){
        res.json({"message":"hej"});
    })
    .post(function(req,res){
        console.log(req.body);
        res.json({"status":"OK",
            "roles":["Replanish", "Configuration"]
        });
    });


rolesRouter.route('/roles')
    .get(function (req, res){
        fs.readFile('sample_data/roles.json', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        data = JSON.parse(data);
        res.json(data);
        });
    });


// add previx api in front of route define by bookRouter
app.use('/api', loginRouter);
app.use('/api', rolesRouter);
// just simple get definition. 
app.get('/', function(req, res){
    res.send('welcome to my API!');
});

app.listen(port, function(){
    console.log('Gulp is running my app on PORT: ' + port);
});
