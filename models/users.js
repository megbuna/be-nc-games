const db = require('../db/connection');

exports.selectUsers = () => {
    return db.query('SELECT * FROM users;')
    .then(({rows}) => {return rows});
};

exports.checkIfUserExists = (username)=>{
    return db.query(`
SELECT * FROM users WHERE username =$1`, [username])
.then (({rowCount}) => {
if (rowCount === 0 && username !== ""){
return Promise.reject({ status: 404, msg: 'Not Found' })
} else {
return true
    };
    });
};