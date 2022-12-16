const {insertsCommentsById} = require('../models/review-comments');
const { checkIfUserExists } = require('../models/check-user');

exports.postCommentsById = (req, res, next) => {
    checkIfUserExists(req.body.username)
    .then(() => {
    return insertsCommentsById(req.params.review_id,req.body)
    })
    .then((review) => {
    res
    .status(201)
    .send(review)
    })
    .catch((err)=>{
        next((err))
    })
}