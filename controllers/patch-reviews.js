const {patchReview} = require('../models/patch-reviews');

exports.updateReview = (req, res, next) => {
    const review_id = req.params.review_id
    const updateReview = req.body
    patchReview(updateReview, review_id)
        .then((review) => {
            res.status(200).send({review})
        })
        .catch((err) => {
            next(err);
        })
}