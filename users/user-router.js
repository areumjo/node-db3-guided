const express = require('express');

const Users = require('./user-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Users.find()
  .then(users => {
    res.json(users);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  // findById() will give us one single user, not many
  Users.findById(id)
  .then(user => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get user' });
  });
});

router.post('/', (req, res) => {
  const userData = req.body;

  Users.add(userData)
  .then(newUser => {
    res.status(201).json(newUser);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to create new user' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.update(changes, id)
  .then(user => {
    if (user) {
      res.json({ update: user });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to update user' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Users.remove(id)
  .then(count => {
    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user' });
  });
});

// all posts by user id
router.get('/:id/posts', (req, res) => {
  const { id } = req.params;

  // // SELECT * FROM posts WHERE user_id = id; => will give us just post with user_id but we want to know username then JOIN
  // db('posts').where({ user_id: id })
  // .then(posts => {
  //   res.json(posts);
  // })
  // .catch(err => {
  //   res.status(500).json({ message: "failed to get posts"})
  // });

  // SELECT posts.id, contents, username FROM posts 
  // JOIN users ON posts.user_id = users.user_id;
  user.findPosts(id)
  .then(posts => {
    res.json(posts);
  })
  .catch(err => {
    res.status(500).json({ message: "failed to get posts"})
  }); 

})

module.exports = router;