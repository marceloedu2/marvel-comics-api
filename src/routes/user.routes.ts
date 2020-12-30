import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UserController from '../controllers/UserController';
import AuthenticateController from '../controllers/AuthenticateController';

const userRouter = Router();
const userController = new UserController();
const authenticateController = new AuthenticateController();

userRouter.post('/register', userController.create);

userRouter.post('/login', authenticateController.execute);

userRouter.put('/', ensureAuthenticated, userController.update);

export default userRouter;
