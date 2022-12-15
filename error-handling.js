const { selectCategories, selectReviews,selectReviewsById } = require("./models/review_id");

const handle404paths = (req, res, next) => {
    res.status(404).send({ msg: 'path not found!' })
};

const handleSpecificErrors = (err, req, res, next) => {
    if (err.code ==='22P02') {
        res.status(400).send({ msg: 'path not found!'});
    } else {
        next(err);
    }
}

const handle500s = (err, req, res, next) =>{
    console.log(err);
    res
    .status(500)
    .send({msg:'internal server error'});
};

module.exports = {
    handle404paths,
    handleSpecificErrors,
    handle500s
}