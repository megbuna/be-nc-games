const db = require('../db/connection');

exports.selectReviews = () => {
    return db.query('SELECT reviews.*, COUNT(comments.comment_id) AS comment_count FROM reviews LEFT OUTER JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id ORDER BY created_at DESC;')
    .then(({rows}) => {return rows});
};

exports.selectReviewId = (reviewId) => {
    return db
        .query("SELECT * FROM reviews WHERE review_id = $1;", [reviewId])
        .then((result) => {

            if (result.rowCount === 0) {
                return Promise.reject({ msg: 'Not Found', status: 404 })
            }
            return result.rows[0];
        });
};

exports.patchReview = (updateReview, reviewId) => {
    const {inc_votes} = updateReview;
    return db.query(`
        UPDATE reviews
        SET votes = votes + $1
        WHERE review_id = $2
        RETURNING *;`, [inc_votes, reviewId])
        .then((result) => { 
            if (result.rowCount === 0 ){
            return Promise.reject({status: 404, msg: 'Not found'})
            };
    return result.rows[0]});
};