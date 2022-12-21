const {selectReviewId} = require('../models/review_id');

exports.getReviewId = (req, res, next) => {
    selectReviewId(req.params.review_id)
    .then((review) => {
        res.status(200).send({review})
    })
    .catch((err) => {
        next((err))
    })
};