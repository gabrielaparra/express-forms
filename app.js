const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// requires ejs as the view engine
app.set('view engine', 'ejs');

// explicitly telling express that the views are located in the views folder
// this is OPTIONAL, only absolutely necessary if we name the views folder
// with a different name
// app.set('views', 'views');

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
  response.render('go-away-view.ejs');
});


app.listen(3000);
