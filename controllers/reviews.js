const {selectReviews} = require('../models/reviews');
exports.getReviews = (req, res) => {
    selectReviews().then((reviews) => {
        res.status(200).send({reviews})
    }); 
};