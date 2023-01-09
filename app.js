const cors = require('cors');
const express = require('express');
const app = express();
const {getCategories} = require('./controllers/categories');
const {getReviews, getReviewId, updateReview} = require('./controllers/reviews');
const {getUsers} = require('./controllers/users');
const {getCommentsById, postCommentsById, deleteComment} = require('./controllers/comments')
const {getEndpoints} = require("./endpoints");
const { handle404paths, handleSpecificErrors, handle500s, handleCustomErrors } = require('./error-handling');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome - You've made it to Michael's Games!")
});

app.get('/api', getEndpoints);

app.get('/api/categories', getCategories);

app.get('/api/reviews', getReviews);

app.get('/api/reviews/:review_id', getReviewId);

app.get('/api/users', getUsers);

app.get('/api/reviews/:review_id/comments', getCommentsById);

app.post('/api/reviews/:review_id/comments', postCommentsById);

app.patch('/api/reviews/:review_id', updateReview);

app.delete('/api/comments/:comment_id', deleteComment);

app.all("*", handle404paths);

app.use(handleCustomErrors);

app.use(handleSpecificErrors);

app.use(handle500s)

module.exports = app;