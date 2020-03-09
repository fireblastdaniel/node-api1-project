const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running... ' });
});

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`\n ** API running on http://localhost:${PORT} ** \n`)
);
