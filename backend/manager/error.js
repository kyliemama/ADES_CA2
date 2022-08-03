module.exports.UserExistsError = class UserExistsError extends Error {
    constructor(username) {
        super(`user ${username} already exists!`)
    }
};

module.exports.NoSuchUserError = class NoSuchUserError extends Error {
    constructor(username) {
        super(`user ${username} not found!`);
    }
}

module.exports.PasswordMismatchError = class PasswordMismatchError extends Error {
    constructor(username) {
        super(`Wrong password for user ${username}!`);
    }
}