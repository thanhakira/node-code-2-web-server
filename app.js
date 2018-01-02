const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const process = require('process');
const port = process.env.PORT | 3000;

var app = express();



hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');



hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFileSync('server.log',log + '\n');
  res.render('maintance.hbs');
  // next();
});

app.use(express.static(__dirname+'/public'));
app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMess: 'This is the home page'
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Pgae',
    welcomeMess: 'This is the about page'
  });
});




app.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});
