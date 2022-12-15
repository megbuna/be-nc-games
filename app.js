const express = require('express');
const app = express();
const { getCategories } = require('./controllers/categories');
const { getReviews } = require('./controllers/reviews');
const { getReviewId } = require('./controllers/review_id');

const { handle404paths, handleSpecificErrors, handle500s, handleCustomErrors } = require('./error-handling');

app.get('/api/categories', getCategories);

app.get('/api/reviews', getReviews);

app.get('/api/reviews/:review_id', getReviewId);

app.use(handleCustomErrors);

app.use(handleSpecificErrors);

app.use(handle500s)

app.all("*", handle404paths);

module.exports = app;