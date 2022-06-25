const users = require('../data/users.json');

const findUserByEmail = (email) => {
    return users.find(user => user.email === email);
}

const findUserById = (id) => {
    return users.find(user => user.id === id);
}

module.exports = {users, findUserByEmail, findUserById}