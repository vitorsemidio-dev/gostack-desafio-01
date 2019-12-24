const express = require('express');

const server = express();

server.use(express.json());

server.get('/projects', (req, res) => {
  return res.send({ ok: 'sucesso get' })
});

server.get('/projects/:id', (req, res) => {
  return res.send({ ok: 'sucesso get :id' })
});

server.post('/projects', (req, res) => {
  return res.send({ ok: 'sucesso post' })
});

server.put('/projects/:id', (req, res) => {
  return res.send({ ok: 'sucesso put' })
});

server.delete('/projects/:id', (req, res) => {
  return res.send({ ok: 'sucesso delete' })
});


server.listen(3000);