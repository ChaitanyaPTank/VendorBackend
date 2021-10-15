import { Router } from 'express';
import * as AdminsController from './controllers/admins.controllers.js';
import { validate } from 'express-validation';
import {
  adminRegister,
  adminLogin,
} from './validators/validators.js';

const router = Router();

router.post('/admin/register', validate(adminRegister), AdminsController.register);
router.post('/admin/login', validate(adminLogin), AdminsController.login);

export default router;