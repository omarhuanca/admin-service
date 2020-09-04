import { Router } from 'express';

import { joiValidator } from '@middlewares/joi';
import { userSchema } from '@shared/userSchema';
import { getAll, getOne, create, update, softDelete } from '@controllers/userController';

// Init router and path
const router = Router();

// Add sub-routes
router.get('/', getAll);
router.get('/:id', getOne);

router.post('/', [joiValidator(userSchema)], create);

router.put('/:id', [joiValidator(userSchema)], update);

router.delete('/:id', [joiValidator(userSchema)], softDelete);

export default router;
