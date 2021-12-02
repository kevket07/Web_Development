const express = require('express')
const app = express()
const logger = require('morgan')
const $fetch = require('node-fetch')


app.use(logger('dev'))
app.use(express.static('public'))

let baseUrl = 'https://boredapi.com/api/activity'

app.get('/', (req, res)=>{
    res.render('home.ejs')
})

app.get('/random', (req, res)=> {
    let endpoint = `${baseUrl}/`
    $fetch(endpoint)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)
        res.render('results.ejs', {data})
    })
    .catch()
})

app.get('/selected', (req, res) =>{
    let route = `?type=`
    let endpoint = `${baseUrl}${route}$req.query.type}`
    $fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        res.render('results.ejs', {data})
    })
    .catch(error => {
        console.error('something went wrong', error)
    })
})


const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {console.log(`app runing on port ${PORT}`)})