const express = require('express')
const app = express()
const logger = require('morgan')
const request = require('request')
app.use(express.static("public"));
app.use(logger('dev'))

app.get('/home', (req,res)=>{
    res.render('home.ejs')
})

app.get('/results', (req, res)=>{
  let endpoint='https://api.coindesk.com/v1/bpi/currentprice.json'
  request(endpoint, (error, response, body) =>{
      if(!error && response.statusCode ==200){
          let parsedData=JSON.parse(body);
          let data=parsedData.results;
          res.render('results.ejs', {data: data });
      }else{
          console.log(error);
      }
  })
});





app.get('/result', (req, res) => {
  let endpoint = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    // first use endpoint
    // second if everything ok get data to be parsed, else handle error
    // third use the parsed data
  
    request(endpoint, (error, response, body) => {
        
        if(!error && response.statuscode == 200){
          let parsedData = JSON.parse(body)
          res.render('results.ejs', {data: parsedData.bpi})
        }else{
          console.log(error)
        }
 //console.log(data);
      
    });
  });




  app.get('/*', (req,res)=>{
    res.redirect('home')
})

const PORT = (process.env.PORT || 3000)
app.listen (PORT, () => console.log(`connection live on ${PORT}`))

