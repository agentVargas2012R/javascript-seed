import express from 'express';
import path from 'path';
import open from 'open';
import cors from 'cors';
import compression from 'compression';

const port = 3005;
const app = express();

app.use(cors());
app.use(compression());
app.use(express.static('dist'));


app.use(function(req, res, next) {    
     // Website you wish to allow to connect
     res.header('Access-Control-Allow-Origin', 'http://localhost:3005');

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
    res.sendFile(path.join(__dirname, '../dist/index.html'));   
});

app.get('/users', function(req, res){

    console.log("Query: " + req.query);
    if(req.query.useMockApi){
        res.json([
            {"id" : 1, "firstName" : "bob", "lastName" : "Smith", "email" : "bob@gmail.com"},
            {"id" : 2, "firstName" : "Tammy", "lastName" : "Smith", "email" : "bob@gmail.com"},
            {"id" : 3, "firstName" : "Tina", "lastName" : "Smith", "email" : "bob@gmail.com"},
        ]);
    }else{
        console.log("RETURNING REAL API>>>>>>>>>");
    }
});

app.listen(port, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("App Server Listening on " + port);
        open('http://localhost:' + port);
    }
});
