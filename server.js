const express = require('express');
const hbs = require('hbs');
var fs = require('fs');
var app = express(); // initialize app

const port = process.env.PORT || 3000; // object that stores all environment as key/value pairs
//use partial for duplicate content such as footer , dates etc...
hbs.registerPartials(__dirname + '/views/partials');

//view engine 'hbs'
app.set('view engine', 'hbs');  // we want to use hbs view engine
//use hbs helper for the same repeated data
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

//also could be used for string manipulation
hbs.registerHelper('capitaliseIt', (text) => {
  return text.toUpperCase();

});
//middleware
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => { //app.use-register middleware
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  console.log(log); //print method use to requst page and the url

next(); //allow program to go another statement
});


//http route handler
app.get('/', (req, res) =>{  // (url, function that tell express what to send back to a person who made a request)
 //res.send('<h1>Hello express!</h1>');
 res.render('index.hbs',{
   pageTitle:'Welcome to Dark sky'
 })
});

app.get('/about',(req, res) => {
  res.render('about.hbs', {
    pageTitle: ' this is About page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/bad',(req, res) => {
  res.send('error: Unable to response to ur request');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
