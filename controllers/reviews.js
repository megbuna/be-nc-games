const {selectReviews, selectReviewId, patchReview} = require('../models/reviews');

exports.getReviews = (req, res) => {
    selectReviews().then((reviews) => {
        res.status(200).send({reviews})
    }); 
};

exports.getReviewId = (req, res, next) => {
    selectReviewId(req.params.review_id)
    .then((review) => {
        res.status(200).send({review})
    })
    .catch((err) => {
        next((err))
    })
};

exports.updateReview = (req, res, next) => {
    const review_id = req.params.review_id
    const updateReview = req.body
    patchReview(updateReview, review_id)
        .then((review) => {
            res.status(200).send({review})
        })
        .catch((err) => {
            next(err);
        });
};