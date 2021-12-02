const express = require('express')
const app = express()
const logger = require('morgan')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')
app.use(logger("dev"))

const keys = require('./config/keys')
mongoose.connect(keys.mongoURI)
.then(()=> console.log(`connected to ${keys.DB} database. `))
.catch(err => console.log(`issues connecting to ${keys.DB} database.`))

const User = require('./models/user.js')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())  //to send the password and user info (or any other sensitive info we don't want exposed in the URL) we need a body parser to send the info in the body with a POST method so it is encoded and not visible in the URL as it would be with a GET method

app.use(require('express-session') ({
        secret: "Blah blah blah",
        resave: false,
        saveUninitiailized: false
}))  //creating the info to verify user...secret can be any string logins should not save the password to the database but the secret is used to created an encrypted hash of the password..
//express session is middleware that happens betwen the req and res...it's a function or a chain of functions that alters the req res cycle
//a function called NEXT (built into express) initiates the middleware
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())





app.get('/', (req, res) =>{
    res.render("home.ejs")
})

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
} //a fat arrow function has to be built before it is invoked...named function doesn't have to be

app.get('/newsfeed', isLoggedIn, (req, res) =>{
    res.render("newsfeed.ejs")
})

app.get('/signup', (req, res) =>{
    res.render("signup.ejs")
})
app.post("/signup", (req, res)=> {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){ //.register is part of mongoose passport
        if(err){
            console.log(err);
            return res.render("signup.ejs")
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/newsfeed");
            });
        }
    })
 }); 

app.get('/login', (req, res) =>{
    res.render("login.ejs")
})
app.post('/login', passport.authenticate('local',  //using the local strategy
    {
        successRedirect: '/newsfeed',
        failureRedirect: '/login'
    }), function(req, res){
        // We don't need anything in our callback function or it will break
        
})

app.get('/logout', (req, res) =>{
    req.logout()
    res.redirect('/')
})




const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {console.log(`app active on port ${PORT}`)})


//saving our data in the mongoose database