import { Router } from 'express';
import * as AdminsController from './controllers/admins.controllers.js';
import * as itemsController from './controllers/items.controller.js';
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

// items route
router.post('/admin/add-item', Authentication, itemsController.addItem);
router.put('/admin/edit-item', Authentication, itemsController.editItem);
router.get('/get-all-items', Authentication, itemsController.getAll);
router.delete('/admin/delete-item/:id', Authentication, itemsController.deleteItem);

export default router;