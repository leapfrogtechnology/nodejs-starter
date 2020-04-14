import { Router } from 'express';

import * as userController from '../controllers/user';

const router = Router();

/**
 * GET /api/users
 */
router.get('/', userController.fetch);

/**
 * POST /api/users
 */
router.post('/', userController.create);

export default router;
