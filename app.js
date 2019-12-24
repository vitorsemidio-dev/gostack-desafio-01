const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.get('/projects/:id', (req, res) => {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);

  if (!project) {
    return res.status(400).json({ error: 'User does not found' });
  }
  
  return res.json(project);
});

server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;
  const project = { id, title, tasks };
  projects.push(project);
  return res.json( project );
});

server.put('/projects/:id', (req, res) => {
  return res.json({ ok: 'sucesso put' });
});

server.delete('/projects/:id', (req, res) => {
  return res.json({ ok: 'sucesso delete' });
});


server.listen(3000);