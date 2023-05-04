const express = require("express");
const cookieparser = require("cookie-parser")
const expresslayouts = require("express-ejs-layouts")
const session = require("express-session")
const passport = require("passport");
const passportlocal = require("./config/passport-local-stratigy")
const app = express();
const mongostore = require("connect-mongo")(session); 
const passportGoogle = require('./config/passport-google-oauth2-stratigy')
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const mongoose=require('mongoose');

let db="mongodb+srv://kambozjashan:8288932866@cluster0.9zgyhsj.mongodb.net/HireUp?retryWrites=true&w=majority"


mongoose.connect(db).then(()=>{
    console.log("Connected to mongoDB");
}).catch((err)=>{
    console.log("Unable to connect to mongoDB",err);
    
})
db=mongoose.connection;



app.use(express.urlencoded());
app.use(cookieparser())
app.use(expresslayouts)
app.use(express.static("./assets"))
//for joining /upload path for viewing images
app.use('/uploads', express.static(__dirname + '/uploads'))


//extract styles and scripts from sub pages into the layout file
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);


app.set('view engine', "ejs");
app.set("views", './views');

//mongostore is used to store the session cookie in the db

app.use(session({
    name: "codeal",
    secret: "somethingsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new mongostore({
        mongooseConnection: db,
        autoRemove: "disabled"
    },
        (err) => {
            console.log(err || "connect mongo setup ok");
        })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setflash)

app.use('/', require("./routes/index"))


app.listen(2000, () => {
    console.log("running on port 2000");
})