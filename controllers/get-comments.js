const {selectCommentsById} = require('../models/get-comments');
const{selectReviewId} = require ('../models/review_id')

exports.getCommentsById = (req, res, next) => {
    const promises = [selectCommentsById(req.params.review_id), selectReviewId(req.params.review_id)]
    Promise.all(promises)
    .then(([comments]) => {
        res.status(200).send({comments})
    })
    .catch((err) => {
        next(err);
    })
}