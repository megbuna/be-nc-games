const db = require('../db/connection');

exports.insertsCommentsById = (reviewId, { username, body }) => {

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
        })
}

