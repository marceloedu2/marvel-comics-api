import { Router } from 'express';
import CharactersController from '../controllers/CharactersController';
import CharactersFavoriteController from '../controllers/CharactersFavoriteController';

const charactersRouter = Router();
const charactersController = new CharactersController();
const charactersFavoriteController = new CharactersFavoriteController();

charactersRouter.post('/', charactersController.list);

charactersRouter.get('/one/:id', charactersController.index);
charactersRouter.post('/search', charactersController.search);
charactersRouter.get('/:id/comics', charactersController.listComics);

charactersRouter.get('/favorite', charactersFavoriteController.list);
charactersRouter.post('/favorite', charactersFavoriteController.create);
charactersRouter.put('/favorite/:id', charactersFavoriteController.remove);

export default charactersRouter;
