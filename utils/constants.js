const users = require('../data/users.json');
const items = require('../data/items.json');

const findUserByEmail = (email) => {
    return users.find(user => user.email === email);
}

const findUserById = (id) => {
    return users.find(user => user.id == id);
}

const findItemById = (id) => {
    return items.find(item => item.itemId == id);
}

const findItemsByCategory = (category) => {
    let itemsByCategory = [];
    items.map(item => {
        if(item.category == category || category == 0)
            itemsByCategory.push(item);
        
    })
    return itemsByCategory;
}

const findItemsByUser = (userId) => {
    let itemsByUser = [];
    items.map(item => {
        if(item.ownerUserId == userId)
            itemsByUser.push(item);
    })
    return itemsByUser;
}

const isItemFromUser = (token, ownerUserId) => {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.id;
    return ownerUserId !== userId ? false : true;
}


module.exports = {users, items, isItemFromUser, findUserByEmail, findUserById, findItemById, findItemsByCategory, findItemsByUser}