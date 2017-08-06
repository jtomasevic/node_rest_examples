var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 3000;

var fs = require('fs');

// import model definition for user.
var User = require("./Models/user.js");
// import model definition for login response.
var LoginResponse = require("./Models/login_response.js");

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
        //var user = new u.User(req);
        var user = new User(req);
        var fileName = null;
        // good case 
        if (user.UserName == "1111"){
            fileName = "roles_userA.json";
        } else if (user.UserName == "2222"){
            fileName = "roles_userB.json";
        }
        // good case contiune returning roles.
        if (fileName!=null){
            fs.readFile('sample_data/' + fileName, 'utf8', function (err,data) {
                if (err) {
                    return console.log(err);
                }
                var response = new LoginResponse(1, JSON.parse(data));
                console.log(data);
                res.json(response);   
            });
        }
        // bas case
        else{
            // bad case: wrong combination of user name and password
            if (user.UserName == "3333"){
                var response = new LoginResponse(2, []);
                res.json(response); 
            }
            // bad case 2: account is blocked
            else{
                var response = new LoginResponse(3, []);
                res.json(response); 
            }
        }
        // res.json({"status":"OK",
        //     "roles":["Replanish", "Configuration"]
        // });
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
