import { Router } from 'express';

import userRouter from './user.routes';
import comicsRouter from './comics.router';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/user', userRouter);
routes.use(ensureAuthenticated);
routes.use('/comics', comicsRouter);

export default routes;
