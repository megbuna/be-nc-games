const {selectCategories} = require('../models/categories');

exports.getCategories = (req, res) => {
    selectCategories().then((categories) => {
        res.status(200).send({categories})
    }); 
};
