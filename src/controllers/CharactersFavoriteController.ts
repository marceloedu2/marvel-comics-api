import { Request, Response } from 'express';
import CharactersFavoritesServices from '../services/CharactersFavoritesServices';

class CharactersFavoritesController {
  public async create(request: Request, response: Response): Promise<void> {
    const charactersServices = new CharactersFavoritesServices();

    const userId = request.user.id;
    const { id, name, description, detail, url } = request.body;

    await charactersServices.create({
      id,
      userId,
      name,
      description,
      detail,
      url,
    });

    response.status(200).send();
  }

  public async list(request: Request, response: Response): Promise<void> {
    const charactersServices = new CharactersFavoritesServices();
    const userId = request.user.id;

    const favorites = await charactersServices.list({ userId });

    response.json(favorites);
  }

  public async remove(request: Request, response: Response): Promise<void> {
    const charactersServices = new CharactersFavoritesServices();
    const userId = request.user.id;
    const { id } = request.params;

    const favorites = await charactersServices.remove({
      userId,
      characterId: Number(id),
    });

    response.json(favorites);
  }
}
export default CharactersFavoritesController;
