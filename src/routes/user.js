import { Router } from 'express';

import * as userController from '../controllers/user';

const router = Router();

/**
 * GET /api/users
 */
router.get('/', userController.fetchAll);

/**
 * POST /api/users
 */
router.post('/', userController.create);

export default router;
