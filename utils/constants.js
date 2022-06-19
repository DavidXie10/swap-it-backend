const users = require('../data/users.json');

const findUser = (email) => {
    return users.find(user => user.email === email);
}

module.exports = {users, findUser}