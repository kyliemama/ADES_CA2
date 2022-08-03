const { response } = require('../app')
const database = require('../database')
module.exports.now = () => {
    return database.query('SELECT NOW()').then((response) => {
        return response.rows[0].now
    })
};