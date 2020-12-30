import { Router } from 'express';
import CharactersController from '../controllers/CharactersController';
import CharactersFavoriteController from '../controllers/CharactersFavoriteController';

const charactersRouter = Router();
const charactersController = new CharactersController();
const charactersFavoriteController = new CharactersFavoriteController();

charactersRouter.post('/', charactersController.list);

charactersRouter.post('/search', charactersController.search);

charactersRouter.get('/favorite', charactersFavoriteController.list);
charactersRouter.post('/favorite', charactersFavoriteController.create);
charactersRouter.put('/favorite/:id', charactersFavoriteController.remove);

export default charactersRouter;
