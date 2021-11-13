import { Router } from 'express';
import * as AdminsController from './controllers/admins.controller.js';
import * as itemsController from './controllers/items.controller.js';
import * as karyakarsController from './controllers/karyakar.controller.js';
import * as ordersController from './controllers/orders.controller.js';
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
router.post('/admin/refresh-token', AdminsController.refreshToken)

// karyakar routes
router.post('/register', validate(adminRegister), karyakarsController.register);
router.post('/login', validate(adminLogin), karyakarsController.login);
router.post('/logout', Authentication, karyakarsController.logout);
router.post('/refresh-token', karyakarsController.refreshToken)

// items routes
router.post('/admin/add-item', Authentication, itemsController.addItem);
router.put('/admin/edit-item', Authentication, itemsController.editItem);
router.get('/get-all-items', Authentication, itemsController.getAll);
router.delete('/admin/delete-item/:id', Authentication, itemsController.deleteItem);

// orders routes
router.post('/add-order', Authentication, ordersController.addOrder);
router.get('/orders', Authentication, ordersController.getOrders);
router.put('/update-order', Authentication, ordersController.updateOrder);

export default router;