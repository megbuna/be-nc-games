const { selectCategories, selectReviews,selectReviewsById } = require("./models/reviews");

const handle404paths = (req, res, next) => {
    res.status(404).send({ msg: 'path not found' })
};

const handleSpecificErrors = (err, req, res, next) => {
    if (err.code ==='22P02') {
        res.status(400).send({ msg: 'bad request'});
    } else {
        next(err);
    }
};

const handle500s = (err, req, res, next) => {
    res
    .status(500)
    .send({msg:'internal server error'});
};

const handleCustomErrors = (err, req, res, next) => {
    if (err.msg) {
    res
    .status(err.status)
    .send({msg: err.msg})
} else {
    next(err);
}
};

module.exports = {
    handle404paths,
    handleSpecificErrors,
    handle500s,
    handleCustomErrors
}