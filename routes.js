import { Router } from 'express';
import { register } from './controllers/admins.controllers.js';

const router = Router();

router.get('/', (req, res) => {
    return res.status(200).send('Working');
});

router.post('/admin/register', register);

export default router;