const jwt = require('jsonwebtoken');
const util = require('util');
const jwtPromise = util.promisify(jwt.sign);

const privateKey = process.env.JWT_PRIVATE_KEY

module.exports.create = (username) => {
    return jwt.sign({ username }, privateKey);
};