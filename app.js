const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// For CORS,Pgm Line no 12 to 29
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://movie-ng.herokuapp.com' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//mongoose.connect("mongodb://localhost:27017/movieAppAngularDB",{useNewUrlParser: true});

mongoose.connect("mongodb+srv://anand:unicornb1331@cluster0-0tquo.mongodb.net/movieAppAngularDB?retryWrites=true&w=majority");

const movieSchema = new mongoose.Schema({
    movie: String,
    actor: String,
    actress: String,
    director: String
});

const movieCollection = new mongoose.model("movieDetails",movieSchema);

///////////////////////////////Add movie///////////////////////
app.post("/addMovie",(req,res)=>{
    const movie = new movieCollection(req.body);
    movie.save((error)=>{
        if(error){
            console.log(error);
        } else {
            console.log("Movie Added Successfully");
            res.json("{'status':'success'}");
            res.send("Successfully added the movie");
        }
    });
});

///////////////////////////////////View Movie///////////////////////////
app.get("/viewMovie",(req,res)=>{
    movieCollection.find((error,data)=>{
        if (error) {
            console.log(error);
        } else {
            console.log("data send to angular");
            res.send(data);
        }
    })
});
////////////////////////////////////////Search movie////////////////
app.post("/searchMovie",(req,res)=>{
    var movie = req.body.movie;
    movieCollection.find({movie: movie},(error,data)=>{
        if(error) {
            console.log(error);
        }else {
            console.log("data send to angular");
            res.send(data);
        }
    });
});

///////////////////////////////////////////////////////////////////////
app.get("/",(req,res)=>{
    res.send("hello");
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server Is Listening");
});

