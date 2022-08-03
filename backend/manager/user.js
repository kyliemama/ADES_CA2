const database = require('../database');
const { POSTGRES_ERRORS } = require('../database/error');
const { UserExistsError, NoSuchUserError } = require('./error');

function hashPassword(password) {
    return bcrypt.hash(password, +process.env.SALT_ROUNDS);
}

function insertIntoDatabase(username, hash) {
    const query = `INSERT INTO users_tab (username, password) VALUES ($1, $2)`;
    const params = [username, hash];
    return database.query(query, params).catch((error) => {
        if (response.code === POSTGRES_ERRORS.UNIQUE_VIOLATION) {
            throw new UserExistsError(username);
        } else {
            throw error;
        }
    });
}

function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}

module.exports.create = (username, password) => {
    return hashPassword(password).then((hash) => {
        insertIntoDatabase(username, hash)
    })
};

function getUserMyUsername(username) {
    const query = `SELECT password FROM users_tab WHERE username = '$1'`
    const params = [username];
    return database.query(query, params).then((response) => {
        if (response.rows.lendth === 0) {
            throw NoSuchUserError(username);
        } else return response.rows[0].password;
    })
}

module.exports.compare = (username, password) => {
    return getUserMyUsername(username).then((hash) => {
        return comparePassword(password, hash)
            .then((isMatched))
    })
}