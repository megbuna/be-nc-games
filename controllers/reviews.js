const {selectReviews} = require('../models/reviews');
exports.getReviews = (req, res) => {
    console.log("in the controller")
    selectReviews().then((reviews) => {
        res.status(200).send({reviews})
    }); 
};