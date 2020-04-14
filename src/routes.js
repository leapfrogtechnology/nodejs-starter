import { Router } from 'express';

// import authenticateUser from './auth';
import userRoutes from './routes/user';
import swaggerSpec from './utils/swagger';

/**
 * Contains public API routes for the application.
 */
const publicRouter = Router();

/**
 * GET /api/swagger.json
 */
publicRouter.get('/swagger.json', (_, res) => {
  res.json(swaggerSpec);
});

/**
 * GET /api
 */
publicRouter.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version,
  });
});

/**
 * Contains secured API routes for the application.
 */
const privateRouter = Router();

/**
 * Authentication middleware for private routes.
 */
// privateRouter.use(authenticateUser);

privateRouter.use('/users', userRoutes);

export { publicRouter, privateRouter };
