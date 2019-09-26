const db = require('../data/db-config.js');


module.exports = {
    find,
    findById,
    findPosts,
    add,
    update,
    remove
};

function find() {
    return db('users');
}

// a single user OR NULL
function findById(id) {
    return db('users').where({ id }).first();
}

function findPosts(user_id) {
    return db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.contents', 'u.username')
    .where({ user_id })
}

// resolves to newly created user
// why not .catch? : .catch stays at higher place (router) no need to put
function add(user) {
    return db('users').insert(userData)
    .then(ids => {
        return findById(ids[0]);
    })
}

// resolves to update user
function update(changes, id) {
    return db('users').where({ id }).update(changes)
    .then(count => {
        return findById(id)
    });
}

// resolves to delete user
function remove(id) {
    return db('users').where({ id }).del();
}