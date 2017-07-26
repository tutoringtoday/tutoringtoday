require('dotenv').config();
const path = require('path');


// ====================
//  CREATE EXPRESS APP
// ====================
const express = require('express');
const app = express();

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));


// ============
//  MIDDLEWARE
// ============
// Use morgan to log requests to console
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// Set up pug as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// ==========
//  ROUTING
// ==========

// Use router for api routes
const router = require('./routes/router');
app.use('/', router);


// ==========
//   SERVER
// ==========
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server started on " + PORT + "...");
});
