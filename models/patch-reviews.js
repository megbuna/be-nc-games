const db = require('../db/connection');

exports.patchReview = (updateReview, review_id) => {
    const {inc_votes} = updateReview;
    return db.query(`
        UPDATE reviews
        SET votes = votes + $1
        WHERE review_id = $2
        RETURNING *;`, [inc_votes, review_id])
        .then((result) => { 
            if (result.rowCount === 0 ){
            return Promise.reject({status: 404, msg: 'Not found'})
            }
    return result.rows[0]})
}   