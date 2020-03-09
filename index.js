const express = require('express');
const shortid = require('shortid');

const server = express();

let users = [];

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
  res.status(200).json(userInfo);
});

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`\n ** API running on http://localhost:${PORT} ** \n`)
);
