const db = require('../db/connection');
exports.selectReviews = () => {
    return db.query('SELECT reviews.*, COUNT(comments.comment_id) AS comment_count FROM reviews LEFT OUTER JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id ORDER BY created_at DESC;')
    .then(({rows}) => {return rows});
};