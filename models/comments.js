const db = require('../db/connection');

exports.selectCommentsById = (reviewId) => {
    return db
        .query(`
            SELECT * FROM comments WHERE review_id = $1
            ORDER BY created_at DESC;`, [reviewId])
            .then((result) => {
                return result.rows
            });
        };

exports.insertsCommentsById = (reviewId, {username, body}) => {

    if (username === '' || body === '') {
        return Promise.reject({ status: 400, msg: 'Bad Request' })
    }

    const created_at = new Date(1511354613389)
    const vote = 0
    return db
        .query(`
            INSERT INTO comments (body, author, review_id, votes, created_at)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *;
            `,
            [body, username, reviewId, vote, created_at])
        .then((result) => {
            return result.rows[0]
        });
};

exports.removeComment = (comment_id) => {
    return db.query(`
    DELETE FROM comments
    WHERE comment_id = $1
    RETURNING *;`, [comment_id])
    .then((result) => {
        if (result.rowCount === 0 ){
            return Promise.reject({status: 404, msg: 'Not found'})
        }
        return result.rows[0]
    });
};