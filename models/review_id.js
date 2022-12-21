const db = require('../db/connection');

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