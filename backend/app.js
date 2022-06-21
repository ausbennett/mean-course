//express logic, that will connect to the node-sever file

//MIDDLEWARE:: is literally just logic that you put in the "middle" the logic for a request
    //can be uses without URL's needing to be hit

/* EXPRESS NOTES 
    == `app.use('/api/path' ,(req, res, next) => { ... });` 
        (same for .get, .post)

        ARGUMENTS: 
        - defines an endpoint
        - takes in another function ref as "middleware functions" Form: (req, res, next) => { ... }

        Now you have to define what to do with a request sent to that endpoint, w/ the middleware fn you have the ability to make use of expresses request,response and next OBJECT functions.
            - req :: represents HTTP requests
            - res :: reqpresents HTTP response
            - next :: move to the next middleware stack and continue there
*/

/* MONGO NOTES

    = Promises
        type of object returne by async method call

        == .then( fn1 , fn2 ) :: fn1 called when promise is fullfilles , fn2 callen when promise rejected
            - can be chained
        == .catch() :: for error

    = .connect()
        connects to mongodb w/ credentialx
*/

//js convention for importing classes
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');

const Post = require('./models/post');
const app = express(); 

mongoose.connect("mongodb+srv://aus:XZWa83xz@cluster0.bvlfucv.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to db');
    })
    .catch(() => {
        console.log('Connection failed');
    });

app.use(bodyParser.json());

//CORS stuff
app.use((req,res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*"); //no  matter what domain the client it is on allow all ports
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept"); //headers to allow
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS"); //http methods to allow, options is implicity used
    next();
});

app.post("/api/posts", (req, res, next) => {
    //const post = req.body; //body field availble by body-parser package
    const post = new Post({
        title: req.body.title, //get the post title of json request
    });
    post.save();
    console.log(post);
    res.status(201).json({message: 'Post added'});// status code for new resource is created
});

//requests that are localhost:3000/api/posts will only reach here
    // trying this in the browser, will return JSON,
    // ** putting any url in browser is a GET requests, this can handle GET requests (cause it returned info to us)
app.get('/api/posts',(req,res,next) => {
   //  const posts = [{ id: '1324134', title: 'server side post', content:'fart stinky'}];
    Post.find()
        .then( documents => {
           //wait for documents to arrive before trying to respond
            res.status(200).json({
                message: 'Posts fetcherd successfully!',
                posts: documents //will 
            });
        });
        //respond in json format, and have a status code of 200 to mean success 
});

// :id is a dyamic route 
app.delete('/api/posts/:id', (req,res,next) => {
    console.log(req.params.id);
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post deleted!"}); // response to request
    }); // mongoose syntax for deleting 
});

module.exports = app; //exporting the express app

