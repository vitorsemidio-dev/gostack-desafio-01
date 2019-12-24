const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

server.get('/projects', (req, res) => {
  return res.json(projects);
});

function findIndex(array, id) {
  return array.findIndex(p => p.id === id);
}

server.get('/projects/:id', (req, res) => {
  const { id } = req.params;
  const index = findIndex(projects, id);

  if (index === -1) {
    return res.status(400).json({ error: 'Project does not found' });
  }

  const project = projects[index];
  
  return res.json(project);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const tasks = [];
  const project = { id, title, tasks };
  projects.push(project);
  return res.json( project );
});

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const index = findIndex(projects, id);

  if (index === -1) {
    return res.status(400).json({ error: 'Project does not found' });
  }

  const project = projects[index];
  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  const index = findIndex(projects, id);

  if (index === -1) {
    return res.status(400).json({ error: 'Project does not found' });
  }

  projects.splice(index, 1);

  return res.status(200);
});


server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const index = findIndex(projects, id);

  if (index === -1) {
    return res.status(400).json({ error: 'Project does not found' });
  }

  const project = projects[index];
  project.tasks.push(title);

  return res.json(project);  
});

server.listen(3000);
