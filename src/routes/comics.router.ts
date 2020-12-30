import { Router } from 'express';
import ComicsController from '../controllers/ComicsController';
import ComicsFavoriteController from '../controllers/ComicsFavoriteController';

const comicsRouter = Router();
const comicsController = new ComicsController();
const comicsFavoriteController = new ComicsFavoriteController();

comicsRouter.post('/', comicsController.list);

comicsRouter.post('/search', comicsController.search);

comicsRouter.get('/favorite', comicsFavoriteController.list);
comicsRouter.post('/favorite', comicsFavoriteController.create);
comicsRouter.put('/favorite/:id', comicsFavoriteController.remove);

export default comicsRouter;
