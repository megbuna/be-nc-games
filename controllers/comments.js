const {selectCommentsById, insertsCommentsById, removeComment} = require('../models/comments');
const {selectReviewId} = require ('../models/reviews');
const {checkIfUserExists} = require('../models/users');

exports.getCommentsById = (req, res, next) => {
    const promises = [selectCommentsById(req.params.review_id), selectReviewId(req.params.review_id)]
    Promise.all(promises)
    .then(([comments]) => {
        res.status(200).send({comments})
    })
    .catch((err) => {
        next(err);
    });
};

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
    });
};





exports.deleteComment = (req, res, next) => {
    const comment_id = req.params.comment_id
    removeComment(comment_id)
    .then(() => {
        res.status(204).send({})
    })
    .catch((err) => {
        next(err);
    })
}