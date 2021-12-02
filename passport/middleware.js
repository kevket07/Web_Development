//this file is just to represent middleware 

const express = require('express')
const app = express()

const doggy = (req, res, next) => {
req.propValue = 'doggy'
console.log(req.propValue)
next()  //next  required to invoke this and MUST be the last argument
}

const horse = (req, res, next) => { //req res are positional  so even if we don't do anything wiht the response it must be included req, next would actually be req, res with a confusing word
    req.proValue += "horse"
    console.log(req.propValue)
    next()  //the next, here stored at the end of the horse const allows the get route below to continue instead of ending the req res cycle
}
//req is just a giant object coming from the client and we can set and add values to an object
//here we are adding the const doggy
app.get('/', doggy, horse, (req, res)=>{
    res.send(`<h1>My value is: ${req.propValue}<h1>`)
})
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`hey this is on port ${PORT}`))