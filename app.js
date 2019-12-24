const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

function findIndex(array, id) {
  return array.findIndex(p => p.id === id);
}

function notFoundMsgError(response) {
  return response.status(404).json({ error: 'Project does not found' });
}

function log() {

}

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const index = findIndex(projects, id);

  if (index === -1) {
    return res.status(404).json({ error: 'Project did not found by middleware' });
    // return notFoundMsgError(res);
  }

  return next();
}

server.get('/projects', (req, res) => {
  return res.json(projects);
});



server.get('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const index = findIndex(projects, id);

  if (index === -1) {
    return notFoundMsgError(res);
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

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const index = findIndex(projects, id);

  if (index === -1) {
    return notFoundMsgError(res);
  }

  const project = projects[index];
  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const index = findIndex(projects, id);

  if (index === -1) {
    return notFoundMsgError(res);
  }

  projects.splice(index, 1);

  return res.send(200);
});


server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const index = findIndex(projects, id);

  if (index === -1) {
    return notFoundMsgError(res)
  }

  const project = projects[index];
  project.tasks.push(title);

  return res.json(project);  
});

server.listen(3000);
