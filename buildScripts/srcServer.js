import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import cors from 'cors';

const port = 3005;
const app = express();
app.use(cors());

const compiler = webpack(config);

/* eslint-disable no-unused-vars*/
/* eslint-disable no-undef*/
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));


app.use(function(req, res, next) {    
     // Website you wish to allow to connect
     res.header('Access-Control-Allow-Origin', '*:*');

     // Request methods you wish to allow
     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
     // Request headers you wish to allow
     res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
     // Set to true if you need the website to include cookies in the requests sent
     // to the API (e.g. in case you use sessions)
     res.setHeader('Access-Control-Allow-Credentials', false);
 
     // Pass to next layer of middleware     
    next();
});

/* eslint-disable no-console*/
app.get('/', function(req, res){
    console.log("locating index.html");                
    res.sendFile(path.join(__dirname, '../src/index.html'));   
});

app.get('/users', function(req, res){

    res.json([
        {"id" : 1, "firstName" : "bob", "lastName" : "Smith", "email" : "bob@gmail.com"},
        {"id" : 2, "firstName" : "Tammy", "lastName" : "Smith", "email" : "bob@gmail.com"},
        {"id" : 3, "firstName" : "Tina", "lastName" : "Smith", "email" : "bob@gmail.com"},
    ]);
});

app.listen(port, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("App Server Listening on " + port);
        open('http://localhost:' + port);
    }
});
