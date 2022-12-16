const express = require('express');
const app = express();
const { getCategories } = require('./controllers/categories');
const { getReviews } = require('./controllers/reviews');
const { getReviewId } = require('./controllers/review_id');
const { getUsers } = require('./controllers/users');
const { postCommentsById } = require('./controllers/review-comments');

const { handle404paths, handleSpecificErrors, handle500s, handleCustomErrors } = require('./error-handling');

app.use(express.json());

app.get('/api/categories', getCategories);

app.get('/api/reviews', getReviews);

app.get('/api/reviews/:review_id', getReviewId);

app.get('/api/users', getUsers);

app.post('/api/reviews/:review_id/comments', postCommentsById)

app.use(handleCustomErrors);

app.use(handleSpecificErrors);

app.use(handle500s)

app.all("*", handle404paths);

module.exports = app;