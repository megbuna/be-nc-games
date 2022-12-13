const express = require('express');
const app = express();
const { getCategories } = require('./controllers/categories');
const { handle404paths } = require('./error-handling');

app.get('/api/categories', getCategories);

app.all("*", handle404paths)

module.exports = app;