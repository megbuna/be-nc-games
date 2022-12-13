const express = require('express');
const app = express();
const { getCategories } = require('./controllers/categories');
const { getReviews } = require('./controllers/reviews')
const { handle404paths } = require('./error-handling');

app.get('/api/categories', getCategories);

app.get('/api/reviews', getReviews)

app.all("*", handle404paths)

module.exports = app;