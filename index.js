const express = require('express');
const shortid = require('shortid');

const server = express();

let users = [];
const sampleData = [
  {
    name: 'Daniel',
    bio: 'Web 27',
    id: '100'
  },
  {
    name: 'Aaron',
    bio: 'Team Lead',
    id: '101'
  },
  {
    name: 'Prue',
    bio: 'Insructor',
    id: '102'
  }
];

users = [...sampleData];

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running... ' });
});

server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  if (!userInfo.name || !userInfo.bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    userInfo.id = shortid.generate();
    users.push(userInfo);
    users.find(user => user.id === userInfo.id)
      ? res.status(201).json(userInfo)
      : res.status(500).json({
          errorMessage: 'There was an error saving the user to the database'
        });
  }
});

server.get('/api/users', (req, res) => {
  users
    ? res.status(200).json(users)
    : res
        .status(500)
        .json({ errorMessage: 'The user information could not be retrieved' });
});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(item => item.id === id);
  users
    ? user
      ? res.status(200).json(user)
      : res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' })
    : res
        .status(500)
        .json({ errorMessage: 'The user information could not be retrieved' });
});

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(item => item.id === id);
  const priorUserCount = users.length;
  if (user) {
    users = users.filter(item => item.id !== id);
    users.length === priorUserCount
      ? res.status(500).json({ message: 'The user could not be removed' })
      : res.status(200).json(user);
  } else {
    res
      .status(404)
      .json({ message: 'The user with the specified ID does not exist' });
  }
});

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`\n ** API running on http://localhost:${PORT} ** \n`)
);
