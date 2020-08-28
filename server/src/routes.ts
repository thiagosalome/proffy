import express from 'express';

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();

// Classes
routes.get('/classes', ClassesController.index);
routes.post('/classes', ClassesController.create);

// Connections
routes.get('/connections', ConnectionsController.index);
routes.post('/connections', ConnectionsController.create);

export default routes;
