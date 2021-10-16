import { Router } from 'express';
import * as AdminsController from './controllers/admins.controllers.js';
import { validate } from 'express-validation';
import {
  adminRegister,
  adminLogin,
} from './validators/validators.js';
import { Authentication } from './helpers/helpers.js';

const router = Router();

// admin routes
router.post('/admin/register', validate(adminRegister), AdminsController.register);
router.post('/admin/login', validate(adminLogin), AdminsController.login);
router.post('/admin/logout', Authentication, AdminsController.logout);

export default router;