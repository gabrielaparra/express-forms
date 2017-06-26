const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// requires ejs as the view engine
app.set('view engine', 'ejs');

// explicitly telling express that the views are located in the views folder
// this is OPTIONAL, only absolutely necessary if we name the views folder
// with a different name
// app.set('views', 'views');

// Morgan middleware
const morgan = require('morgan');

// console.log information about the connection
// The dev level logs the :method, :url, :status, :response-time,
// and content-length.
app.use(morgan('dev'));

app.use((request, response, next) => {
  console.log('Our middleware');

  req.pizza = 'pizza';

  //move on to the next step, without this the page will hang forever 
  next();
});

// telling express to use the static files in the public folder
app.use(express.static('public'));

app.use(expressLayouts);

// telling express that the layout is the file layout.ejs
// OPTIONAL, we only have to do this if we call the layout file differently
// from 'layout'
// app.set('layout', 'layout.ejs');


//ROUTES
app.get('/', (request, response, next) => {
  response.render('home-view.ejs');
});

app.get('/search', (request, response, next) => {
  console.log('In the /search route', req.pizza);
  // comes from the middleware on line 27

  response.render('search-form-view.ejs');
});

app.get('/results', (request, response, next) => {
  // request.query refers to the data in the "query string" (?food=pizz&price=88)
  const theTerm = request.query.searchTerm;
  const theCheckbox = request.query.interestBox;

  if (theCheckbox === 'on') {
    response.render('pizza-results-view.ejs', {
      theSearch: theTerm
    });
  } else {
    response.render('results-view.ejs', {
      theSearch: theTerm
    });
  }
});

app.get('/login', (request, response, next) => {
  response.render('login-form-view.ejs');
});

app.post('/check-login', (request, response, next) => {
  // input name = "emailValue"
  const userEmail = request.body.emailValue;
  // input name = "passwordValue"
  const userPassword = request.body.passwordValue;

  //AUTHENTICATION PROCESS
  if (userEmail === "a@a.a" && userPassword === "swordfish") {
    response.render('welcome-view.ejs');
  } else {
    response.render('go-away-view.ejs');
  }
});


app.listen(3000);
